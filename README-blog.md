# 笛卡尔似的梦的博客

Astro + Fuwari 的极简定制版。原三篇文章的正文逐字迁移，原图保留，时间使用 Asia/Shanghai。

## 本地维护

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

文章保存在 `src/content/posts/`，新文章可以使用 `pnpm new-post 文件名` 创建。
站点样式在 `src/styles/quiet.css`，通用页面和播放器在 `src/layouts/QuietLayout.astro`。
音乐文件为 `public/audio/summer.mp3`，默认不自动播放。

当前通过 Sites 托管。也可以把同一项目部署到 Cloudflare Pages：构建命令 `pnpm build`，输出目录 `dist`。迁移托管时请把 `astro.config.mjs` 的 `site` 改成新域名。

原主题采用 MIT 许可证，保留上游 LICENSE；文章不随代码许可证重新授权。
