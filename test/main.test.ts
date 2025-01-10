import { App, PluginManifest } from 'obsidian';
import SummanyPlugin from '../main';
import test, { describe } from 'node:test';

describe('SummanyPlugin', () => {
	let app: App;
	let plugin: SummanyPlugin;

	beforeEach(async () => {
		app = new App();
		const manifest = {} as PluginManifest;
		plugin = new SummanyPlugin(app, manifest);
		await plugin.onload();
	});

	afterEach(async () => {
		await plugin.onunload();
	});

	test('should load default settings', async () => {
		expect(plugin.settings).toEqual({
			devToApiKey: '',
			baseUrl: '',
			apiKey: '',
			model: [],
			customPrompt: 'Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand.',
			geminiApiKey: '',
		});
	});

	test('should generate slug correctly', async () => {
		const title = 'Test Title';
		const slug = await plugin.generateSlug(title);
		expect(slug).toBe('test-title');
	});

	// Add more tests for other functionalities
});
function beforeEach(callback: () => Promise<void>) {
    // Call the callback function before each test
    callback().catch(err => {
        console.error('Error in beforeEach:', err);
    });
}
function expect(actual: any) {
    return {
        toEqual(expected: any) {
            if (actual !== expected) {
                throw new Error(`Expected ${actual} to equal ${expected}`);
            }
        },
        toBe(expected: any) {
            if (actual !== expected) {
                throw new Error(`Expected ${actual} to be ${expected}`);
            }
        }
    };
}
function afterEach(callback: () => Promise<void>) {
    // Call the callback function after each test
    callback().catch(err => {
        console.error('Error in afterEach:', err);
    });
}

