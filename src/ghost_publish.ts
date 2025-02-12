export {}
// import { MarkdownView, Notice, requestUrl } from "obsidian";

// import { sign } from "jsonwebtoken";
// import SummanyPlugin from "main";

// const matter = require("gray-matter");
// const MarkdownIt = require("markdown-it");

// const md = new MarkdownIt();
// const version = "v4";

// const contentPost = (frontmatter: ContentProp, data: DataProp) => ({
// 	posts: [
// 		{
// 			...frontmatter,
// 			html: md.render(data.content),
// 		},
// 	],
// });

// export const publishPost = async (
// 	plugin: SummanyPlugin,
// 	view: MarkdownView
// ) => {
// 	// Ghost Url and Admin API key
// 	const key = plugin.settings.ghostApiKey;
// 	if (key.includes(":")) {
// 	const [id, secret] = key.split(":");

// 	// Create the token (including decoding secret)
// 	const token = sign({}, Buffer.from(secret, "hex"), {
// 		keyid: id,
// 		algorithm: "HS256",
// 		expiresIn: "5m",
// 		audience: `/${version}/admin/`,
// 	});
// 	const metaMatter = view.file
// 		? view.app.metadataCache.getFileCache(view.file)?.frontmatter
// 		: null;
// 	const data = matter(view.getViewData());

// 	const frontmatter = {
// 		title: metaMatter?.title || (view.file ? view.file.basename : ""),
// 		tags: metaMatter?.tags || [],
// 		featured: metaMatter?.description || false,
// 		status: "published",
// 		excerpt: metaMatter?.description || undefined,
// 		feature_image: metaMatter?.image || undefined,
// 	};
// 	try{
// 	const result = await requestUrl({
// 		url: `${plugin.settings.ghostUrl}/ghost/api/${version}/admin/posts/?source=html`,
// 		method: "POST",
// 		contentType: "application/json",
// 		headers: {
// 			"Access-Control-Allow-Methods": "POST",
// 			"Content-Type": "application/json;charset=utf-8",
// 			Authorization: `Ghost ${token}`,
// 		},
// 		body: JSON.stringify(contentPost(frontmatter, data)),
// 	})

// 	const json = result.json;

// 	if (json?.posts) {
// 		new Notice(
// 			`"${json?.posts?.[0]?.title}" has been ${json?.posts?.[0]?.status} successful!`
// 		);
// 	} else {
// 		new Notice(`${json.errors[0].context || json.errors[0].message}`);
// 		new Notice(
// 			`${json.errors[0]?.details[0].message} - ${json.errors[0]?.details[0].params.allowedValues}`
// 		);
// 	}

// 	return json;
// } catch (error: any) {
// 	new Notice(`Couldn't connect to the Ghost API. Is the API URL and Admin API Key correct?

// ${error.name}: ${error.message}`)
// }}
// else {
// 	new Notice("Error: Ghost API Key is invalid.")
// }};

// export interface ContentProp {
// 	title: string;
// 	tags?: string[];
// 	featured?: boolean;
// 	status: string;
// 	excerpt?: string | undefined;
// 	feature_image?: string;
// }

// export interface DataProp {
// 	content: string;
// }