import { Injectable } from '@angular/core';

@Injectable()
export class TextSelection {
    public saveSelection(containerEl: any) {
        const range = window.getSelection().getRangeAt(0);
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(containerEl);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        const start = preSelectionRange.toString().length;

        return {
            start: start,
            end: start + range.toString().length
        };
    }

    public restoreSelection(containerEl: any, savedSel: any) {
        let charIndex = 0,
            range = document.createRange();
        range.setStart(containerEl, 0);
        range.collapse(true);
        let nodeStack = [containerEl],
            node: any,
            foundStart = false,
            stop = false;

        while (!stop && (node = nodeStack.pop())) {
            if (node.nodeType == 3) {
                const nextCharIndex = charIndex + node.length;
                if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                    range.setStart(node, savedSel.start - charIndex);
                    foundStart = true;
                }
                if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                    range.setEnd(node, savedSel.end - charIndex);
                    stop = true;
                }
                charIndex = nextCharIndex;
            } else {
                let i = node.childNodes.length;
                while (i--) {
                    nodeStack.push(node.childNodes[i]);
                }
            }
        }

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    public doRestore(selection: any, elementRef: any) {
        if (selection) {
            this.restoreSelection(elementRef, JSON.parse(selection));
        }
    }
}
