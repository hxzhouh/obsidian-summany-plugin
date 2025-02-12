import { App, MarkdownView, Notice, TFile } from 'obsidian';

export interface ActiveFileInfo {
    view: MarkdownView;
    file: TFile;
    isZhCN: boolean;
}

export class FileUtils {
    constructor(private app: App) {}
    /**
     * 获取当前活动文件的信息
     * @returns ActiveFileInfo 或 null（如果没有活动文件）
     */
    getActiveFileInfo(): ActiveFileInfo | null {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) {
            new Notice('No active markdown view');
            return null;
        }

        const file = view.file;
        if (!file) {
            new Notice('No active file');
            console.log('No active file');
            return null;
        }

        return {
            view,
            file,
            isZhCN: file.path.includes('zh-cn')
        };
    }

    /**
     * 安全地执行需要活动文件的操作
     * @param callback 回调函数，接收 ActiveFileInfo 参数
     */
    async withActiveFile<T>(callback: (fileInfo: ActiveFileInfo) => Promise<T> | T): Promise<T | null> {
        const fileInfo = this.getActiveFileInfo();
        if (!fileInfo) {
            return null;
        }
        return await callback(fileInfo);
    }
}