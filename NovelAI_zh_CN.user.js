// ==UserScript==
// @name         NovelAI 简体中文全局汉化
// @namespace    https://github.com/TataraMo/NovelAI-Localization-zh_CN
// @version      5.0.0
// @description  NovelAI Full Site Localization into Simplified Chinese
// @author       W是包子N不理, Optimized by Assistant
// @match        https://novelai.net/*
// @icon         https://novelai.net/icons/novelai-round.png
// @require      https://update.greasyfork.org/scripts/575188/1807033/NovelAi_I18N.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @license      GPL-3.0-or-later
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // ==========================================
    // 1. 词库载入与校验机制
    // ==========================================
    if (typeof NAI_I18N === 'undefined') {
        console.error('NovelAI 汉化错误：未找到外部词库 NAI_I18N！请检查 @require 链接是否正确加载了词库文件。');
        return;
    }

    // 将外部传入的 static 词库转化为高性能 Map
    const i18nMap = new Map(Object.entries(NAI_I18N.static || {}));
    // 加载正则词库
    const regexList = NAI_I18N.regexp || [];

    // ==========================================
    // 2. 核心翻译引擎与防抖逻辑
    // ==========================================

    // 严禁涉足的 DOM 标签，避免破坏框架绑定和输入区域
    const ignoreTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'SVG', 'PATH']);
    // 编辑器容器选择器
    const editorSelectors = '.ProseMirror, [contenteditable="true"], .CodeMirror, .cm-content';

    function isIgnored(node) {
        if (!node) return true;
        let el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
        if (!el) return true;
        if (ignoreTags.has(el.tagName)) return true;
        if (el.isContentEditable || (el.closest && el.closest(editorSelectors))) return true;
        return false;
    }

    function translateTextNode(node) {
        let originalText = node.nodeValue;
        if (!originalText) return;
        
        let trimmedText = originalText.trim();
        if (!trimmedText) return; 

        // 将多行空白符 (回车/换行/多个空格) 归一化为单空格，匹配带换行渲染的英文悬浮提示。
        let normalizedText = originalText.replace(/\s+/g, ' ').trim();

        // O(1) 查找
        let exactMatch = i18nMap.get(normalizedText);
        if (exactMatch) {
            // 匹配成功后，原样保留前后的空格，仅替换文字主体
            let leadingSpace = originalText.match(/^\s*/)[0];
            let trailingSpace = originalText.match(/\s*$/)[0];
            node.nodeValue = leadingSpace + exactMatch + trailingSpace;
            return;
        }

        // 回退至正则匹配
        for (let i = 0; i < regexList.length; i++) {
            let item = regexList[i];
            if (item[0].test(normalizedText)) {
                let replaced = normalizedText.replace(item[0], item[1]);
                if (normalizedText !== replaced) {
                    let leadingSpace = originalText.match(/^\s*/)[0];
                    let trailingSpace = originalText.match(/\s*$/)[0];
                    node.nodeValue = leadingSpace + replaced + trailingSpace;
                }
                return;
            }
        }
    }

    function translateAttributes(el) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            let placeholder = el.getAttribute('placeholder');
            if (placeholder) {
                let match = i18nMap.get(placeholder.replace(/\s+/g, ' ').trim());
                if (match) el.setAttribute('placeholder', match);
            }
        }
        if (el.hasAttribute('title')) {
            let title = el.getAttribute('title');
            if (title) {
                let match = i18nMap.get(title.replace(/\s+/g, ' ').trim());
                if (match) el.setAttribute('title', match);
            }
        }
        if (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'button') && el.value) {
            let trimmedVal = el.value.replace(/\s+/g, ' ').trim();
            if (trimmedVal.toLowerCase() === 'submit') {
                el.value = '提交';
            } else {
                let match = i18nMap.get(trimmedVal);
                if (match) el.value = match;
            }
        }
    }

    const treeWalkerFilter = {
        acceptNode: function(node) {
            let el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
            if (!el) return NodeFilter.FILTER_SKIP;
            
            // 直接拒绝整个树枝
            if (ignoreTags.has(el.tagName) || el.isContentEditable || (el.closest && el.closest(editorSelectors))) {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    };

    function processTree(root) {
        let rootEl = root.nodeType === Node.ELEMENT_NODE ? root : root.parentElement;
        if (rootEl && (ignoreTags.has(rootEl.tagName) || rootEl.isContentEditable || rootEl.closest(editorSelectors))) {
            return;
        }

        if (root.nodeType === Node.TEXT_NODE) {
            translateTextNode(root);
            return;
        } else if (root.nodeType === Node.ELEMENT_NODE) {
            translateAttributes(root);
        }

        const walker = document.createTreeWalker(
            root, 
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, 
            treeWalkerFilter, 
            false
        );
        
        let currentNode;
        while (currentNode = walker.nextNode()) {
            if (currentNode.nodeType === Node.TEXT_NODE) {
                translateTextNode(currentNode);
            } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
                translateAttributes(currentNode);
            }
        }
    }

    // ==========================================
    // 3. 双重防抖 DOM 监听
    // ==========================================
    let pendingMutations = new Set();
    let debounceTimer = null;
    let isProcessing = false;

    const observer = new MutationObserver((mutations) => {
        let hasValidMutations = false;

        for (let i = 0; i < mutations.length; i++) {
            let m = mutations[i];
            let target = m.target;
            
            let el = target.nodeType === Node.ELEMENT_NODE ? target : target.parentElement;
            if (el && (ignoreTags.has(el.tagName) || el.isContentEditable || el.closest(editorSelectors))) {
                continue; 
            }

            pendingMutations.add(m);
            hasValidMutations = true;
        }

        if (hasValidMutations && !isProcessing) {
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                requestAnimationFrame(processMutations);
            }, 30);
        }
    });

    function processMutations() {
        isProcessing = true;
        observer.disconnect(); 
        
        let mutationsToProcess = Array.from(pendingMutations);
        pendingMutations.clear();
        let processedNodes = new Set(); 

        for (let m of mutationsToProcess) {
            if (m.type === 'childList') {
                for (let node of m.addedNodes) {
                    if (processedNodes.has(node)) continue;
                    processTree(node); 
                    processedNodes.add(node);
                }
            } else if (m.type === 'characterData') {
                if (processedNodes.has(m.target)) continue;
                if (!isIgnored(m.target)) translateTextNode(m.target);
                processedNodes.add(m.target);
            } else if (m.type === 'attributes') {
                if (processedNodes.has(m.target)) continue;
                if (!isIgnored(m.target)) translateAttributes(m.target);
                processedNodes.add(m.target);
            }
        }

        observe(); 
        isProcessing = false;
    }

    function observe() {
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['placeholder', 'title', 'value']
        });
    }

    // 注入初始扫描
    processTree(document.body);
    observe();

})();
