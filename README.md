# QuaintAI — 公司官网（静态站）

零构建的纯静态站点：三个 HTML 页面 + 一份 CSS + 一份 JS，无框架、无 npm 依赖、无外部 CDN /
字体 / 图床。国内访问不依赖任何外链。

```
index.html      首页（一句话业务描述 / 关于我们 / Contact）
privacy.html    隐私政策
terms.html      服务条款
assets/style.css
assets/main.js  中英切换
.nojekyll       GitHub Pages 必需（跳过 Jekyll 处理）
```

## 本地预览

```bash
cd <本目录>
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080/
```

## 怎么改文案

所有文案都直接写在三个 `.html` 文件里，没有模板、没有数据文件，改完保存刷新即可。

- 中英文是**成对的兄弟元素**：`<p lang="zh">中文</p>` 和 `<p lang="en">English</p>`。
  CSS 按 `<html data-lang>` 显示其中一种。**改中文务必同时改英文**，否则切到另一语种会
  看到旧内容。新增文案也要成对写。
- 页面标题与 `description` / OG 描述写在每个文件的 `<html>` 标签上：
  `data-title-zh` / `data-title-en` / `data-desc-zh` / `data-desc-en`。`main.js` 会在
  切换语言时同步 `<title>`、`<meta name="description">`、`og:*` 和 `<html lang>`。
- 待填写的信息用 `<span class="todo">` 标出（黄色虚线框），全站搜 `TODO` 即可找全。
- 邮箱 `contact@quaint-ai.com` 出现在 `index.html`、`privacy.html`、`terms.html` 三处
  正文和 footer 里，替换时请全局搜索。**此邮箱为占位，待确认。**
- 配色在 `assets/style.css` 顶部的 `:root` 变量里；深色为默认，浅色在
  `@media (prefers-color-scheme: light)` 里，两套都要改。

## 开 GitHub Pages

1. 把本目录内容推到仓库（`index.html` 必须在仓库根目录或 `docs/` 下）。
2. 仓库 **Settings → Pages → Build and deployment**：Source 选 **Deploy from a branch**，
   分支选 `main`，目录选 `/ (root)`（若放在 `docs/` 则选 `/docs`），Save。
3. 等一两分钟，站点出现在 `https://<用户名>.github.io/<仓库名>/`。
4. 绑定 `quaint-ai.com`：同一页面的 **Custom domain** 填域名，GitHub 会在仓库根生成
   `CNAME` 文件；同时在域名 DNS 处把根域 A 记录指向 GitHub Pages 的 IP（或把
   `www` 配 CNAME 指向 `<用户名>.github.io`），生效后勾选 **Enforce HTTPS**。
5. `.nojekyll` 必须保留（空文件即可），否则 Jekyll 会忽略下划线开头的文件并拖慢构建。

## 待老板拍板填写

全站搜 `TODO` 可找全：

| 项 | 位置 |
| --- | --- |
| 注册主体全称 | `index.html`、`privacy.html`、`terms.html` |
| 注册地址 | `index.html`、`privacy.html`、`terms.html` |
| 适用法律与争议管辖地 | `terms.html` 第七节 |
| `contact@quaint-ai.com` 是否为最终对外邮箱 | 三个页面 |

两个法律页顶部的「最后更新：2026-09-20」是本次撰写日期，正式发布时按实际上线日改。

本站不含任何人员信息——无姓名、学校、任职公司、人数、职位或履历。新增文案请保持这条约束。
