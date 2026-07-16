---
title: Claude Code CLI 和 Codex APP 的使用体验
date: 2026-07-16 21:10:00
tags: [AI, 开发工具]
categories: 开发工具
permalink: 2026/07/16/Claude-Code-CLI-和-Codex-APP-的使用体验/
---

<div style="text-align: center; margin-bottom: 35px;">
  <b><i>"The best coding assistant is not the one that writes the most code, but the one that keeps you closest to the real project."</i></b>
</div>

<!-- more -->

这段时间我主要体验了两类 AI 编程工具：一个是 Anthropic 的 **Claude Code CLI**，另一个是 OpenAI 的 **Codex APP**。前者更像是嵌入终端的开发搭子，后者更像是一个带图形界面的任务工作台。

本文会偏教程和评测一些：先介绍它们的入口、基本用法和核心能力，再对比各自适合的场景，最后写一点个人使用感受。

<p style="margin-bottom: 0px;"><b>说明：本文写作时间为 2026-07-16，AI 编程工具更新很快，安装命令和功能入口建议以官方文档为准。</b></p>

<div style="display: flex; justify-content: center; align-items: center; gap: 48px; margin: 30px 0 10px;">
  <img src="/imgs/Claude-Code-CLI-和-Codex-APP-的使用体验/anthropic-logo.svg" style="width: 38%; max-width: 260px; height: auto;"></img>
  <img src="/imgs/Claude-Code-CLI-和-Codex-APP-的使用体验/openai-logo.svg" style="width: 38%; max-width: 260px; height: auto;"></img>
</div>

<p style="text-align: center; margin-top: 0px;">图片来源：Wikimedia Commons（Anthropic logo、OpenAI logo）</p>

# 一、工具定位

## 1. Claude Code CLI

Claude Code 是 Anthropic 面向代码场景的 agentic coding tool，它可以读取代码库、编辑文件、运行命令，并和开发工具集成。官方文档中提到它可以运行在 terminal、IDE、desktop app 和 browser 等多个入口中，而这里主要讨论的是 **CLI 入口**。

简单来说，Claude Code CLI 的核心特点是：

- 直接在终端中工作
- 能读取和修改本地项目
- 可以运行测试、构建、lint 等命令
- 支持 `CLAUDE.md`、skills、hooks、MCP 等自定义能力
- 适合习惯命令行开发的人

它给人的感觉不是“打开一个聊天窗口问问题”，而是“在当前项目目录里叫来一个会读代码、会改文件、会跑命令的助手”。

## 2. Codex APP

Codex APP 这里指 OpenAI 在 ChatGPT 桌面端中提供的 Codex 工作入口。根据 OpenAI 的 ChatGPT Learn 文档，桌面 app 更像是复杂工作的 command center，可以在一个桌面工作区里运行并行项目、处理文件、使用浏览器和桌面应用，并保持长任务继续推进。

它的核心特点是：

- 有图形界面，任务、文件、终端输出更容易观察
- 可以打开文件夹或项目，让 Codex 使用其中的上下文
- 支持 Codex、Chat、Work 等不同工作模式
- 可以结合浏览器、插件、文件产物和本地工具
- 更适合长任务、可视化检查和多线程工作

如果说 Claude Code CLI 的优势是“快进快出”，那么 Codex APP 的优势就是“看得见、管得住、能切换”。

# 二、安装与启动

## 1. Claude Code CLI 安装

Claude Code 官方推荐的安装方式有 Native Install、Homebrew、WinGet 等。以常见系统为例：

macOS、Linux、WSL：

```sh
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell：

```powershell
irm https://claude.ai/install.ps1 | iex
```

Windows CMD：

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

安装完成后，在项目目录中运行：

```sh
cd your-project
claude
```

第一次运行时会要求登录账号。官方文档也提供了检查命令：

```sh
claude --version
claude doctor
```

如果是在 Windows 上使用，需要注意当前终端是 PowerShell 还是 CMD，因为二者的安装命令不同。另外，Claude Code 在 Windows 原生环境和 WSL 中都能运行，但如果你大量依赖 Linux 工具链，WSL 会更自然。

## 2. Codex APP 安装与启动

Codex APP 的入口在 ChatGPT 桌面 app 中。基本流程是：

1.&nbsp;&nbsp;下载并安装 ChatGPT 桌面端  
2.&nbsp;&nbsp;使用 ChatGPT 账号登录  
3.&nbsp;&nbsp;选择项目、任务或打开本地文件夹  
4.&nbsp;&nbsp;在 Chat、Work、Codex 等入口中选择合适模式  
5.&nbsp;&nbsp;描述要完成的任务，并提供必要上下文  

Codex 也有 CLI 入口，安装方式类似：

```sh
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

然后进入项目目录运行：

```sh
codex
```

不过本文重点是 Codex APP。和 CLI 相比，APP 的好处是它把任务、文件、产物、浏览器、终端输出放到了更容易管理的界面里，对于不想一直盯着命令行的人会更友好。

# 三、基础使用流程

## 1. Claude Code CLI 的典型流程

Claude Code CLI 最常见的使用方式是在项目目录中直接启动：

```sh
claude
```

进入交互界面后，可以直接描述任务，例如：

```text
请阅读这个项目的结构，并告诉我主要模块之间的关系。
```

或者：

```text
帮我修复登录页提交后没有跳转的问题，修改后运行相关测试。
```

它也支持带初始 prompt 启动：

```sh
claude "explain this project"
```

如果只是想要一次性输出，不进入完整交互模式，可以使用 `-p`：

```sh
claude -p "explain this function"
```

处理管道输入也很方便：

```sh
cat logs.txt | claude -p "explain these errors"
```

继续最近一次会话：

```sh
claude -c
```

恢复某个指定会话：

```sh
claude -r "auth-refactor" "Finish this PR"
```

这些命令让 Claude Code CLI 很适合和 shell、git、CI 脚本结合起来。例如查看日志、解释 diff、生成 PR 描述、批量检查文件等，都可以放进命令行工作流中。

## 2. Codex APP 的典型流程

Codex APP 的流程更接近桌面应用：

1.&nbsp;&nbsp;打开 ChatGPT 桌面端  
2.&nbsp;&nbsp;选择一个项目或打开本地文件夹  
3.&nbsp;&nbsp;进入 Codex 相关任务界面  
4.&nbsp;&nbsp;告诉它要做什么  
5.&nbsp;&nbsp;观察它读取文件、运行命令、提出修改  
6.&nbsp;&nbsp;在界面里检查 diff、终端输出和生成的文件  

比较适合的 prompt 形式如下：

```text
请阅读这个 Hexo 博客项目，仿照现有文章格式新建一篇关于 AI 编程工具体验的博文。不要修改主题文件，完成后运行构建检查。
```

或者：

```text
请检查当前分支的未提交改动，按严重程度给出 code review 意见，不要直接修改文件。
```

Codex APP 的优势在于它更适合“看过程”。它修改了哪些文件、跑了哪些命令、哪里需要授权、生成了哪些产物，都比纯终端更直观。对于长任务、多文件任务、需要图片或网页检查的任务，这种可视化工作台会舒服很多。

# 四、项目规则与权限控制

## 1. Claude Code 的 CLAUDE.md

Claude Code 可以通过项目根目录中的 `CLAUDE.md` 保存长期指令。比如项目使用什么代码风格、常用测试命令、哪些目录不能动、提交前要做什么检查，都可以写进去。

例如：

```md
# Project Instructions

- 修改代码前先阅读相关模块。
- 不要直接删除用户文件。
- 前端改动完成后运行 npm run build。
- 回答中使用中文说明修改内容。
```

这样每次在项目中启动 Claude Code，它就能自动读取这些约束。对于长期维护的项目来说，这比每次手动重复说明要可靠得多。

## 2. Codex 的 AGENTS.md

Codex 中对应的项目规则文件通常是 `AGENTS.md`。它也用于保存仓库级别的长期约束，例如禁止批量删除、必须使用某个测试命令、代码风格要求等。

例如：

```md
# AGENTS.md

- 禁止批量删除文件或目录。
- 需要删除文件时，只能一次删除一个明确路径的文件。
- 修改 source/_posts 下的文章时，保持现有 Hexo front matter 格式。
- 完成后运行 npm run build 检查。
```

我觉得这类规则文件是 AI 编程工具真正变得“可协作”的关键。没有规则时，它像一个很聪明但容易误会需求的人；有了规则后，它才更像项目里的固定成员。

## 3. 权限与沙盒

两类工具都会涉及权限问题：能不能读文件、能不能改文件、能不能联网、能不能运行命令、能不能访问外部工具。这里不建议为了省事直接开启最高权限。

比较稳妥的做法是：

- 小任务先给较小权限
- 涉及删除、移动、批量修改时要求确认
- 跑测试、安装依赖、联网查询时单独授权
- 修改完成后检查 git diff
- 对长任务设置清晰边界

AI 编程工具的能力越强，越需要明确边界。否则它能替你完成工作，也能替你制造一些很难回滚的麻烦。

# 五、功能对比

| 维度 | Claude Code CLI | Codex APP |
| --- | --- | --- |
| 主要入口 | 终端 | ChatGPT 桌面端 |
| 使用体验 | 命令行优先，响应直接 | 图形界面优先，过程可视 |
| 上手门槛 | 需要熟悉 terminal | 更接近普通桌面软件 |
| 适合任务 | 快速修改、脚本化、日志分析、CI 场景 | 长任务、多文件产物、可视化检查、并行任务 |
| 项目规则 | `CLAUDE.md` | `AGENTS.md` |
| 自动化能力 | 适合和 shell、pipe、脚本组合 | 适合任务管理、浏览器、插件和文件工作流 |
| 过程观察 | 主要看终端输出 | 可以看任务、文件、diff、产物 |
| 心智模型 | 会写代码的终端助手 | 会处理项目的桌面工作台 |

# 六、适合 Claude Code CLI 的场景

## 1. 快速理解项目

进入项目目录后直接问：

```sh
claude "请解释这个项目的目录结构和启动方式"
```

这类任务 Claude Code CLI 很顺手，因为它不需要复杂界面，读完文件后直接在终端给结论。

## 2. 修复明确 bug

例如已经知道报错信息：

```sh
claude "运行测试并修复当前失败的 auth 相关用例"
```

只要项目测试命令清晰，它就可以形成“读代码 -> 修改 -> 运行测试 -> 继续修”的闭环。

## 3. 分析日志和 diff

命令行最大的优势就是组合：

```sh
git diff | claude -p "请 review 这些改动，重点关注潜在 bug"
```

或者：

```sh
tail -200 app.log | claude -p "分析最近的错误日志"
```

这种场景用 CLI 比复制粘贴到网页里自然很多。

# 七、适合 Codex APP 的场景

## 1. 多文件修改

如果任务会涉及多个文件、多个步骤，并且需要反复检查 diff，Codex APP 会更舒服。因为你可以在界面里持续观察它的执行过程，而不是只在终端中滚动查看输出。

## 2. 写文章、文档、表格等产物

Codex APP 不只是写代码，它也适合处理文档和内容类任务。例如本文这种博客文章，既要读项目格式，又要新建 Markdown，还要检查构建结果。APP 的文件产物展示会更直观。

## 3. 需要浏览器或视觉检查的任务

如果是前端页面、数据可视化、网页调试，Codex APP 配合浏览器检查会更方便。因为这类任务不只是“代码是否通过测试”，还要看页面是否真的符合预期。

## 4. 长任务和并行任务

当任务不是三五分钟能完成时，APP 的任务管理感会明显强一些。你可以切换任务、回看上下文、检查中间产物，也更容易把一个大任务拆成几个小任务推进。

# 八、一些使用建议

## 1. 先让它读项目，不要上来就改

比较稳妥的第一句话是：

```text
先阅读项目结构和相关文件，不要修改代码，告诉我你准备怎么做。
```

这样可以避免它在不了解项目约定时直接动手。

## 2. 任务要小

不要一次说：

```text
帮我重构整个项目。
```

更好的说法是：

```text
请只重构登录模块，把表单校验逻辑抽到单独函数中，保持外部行为不变，并运行现有测试。
```

AI 不是不能做大任务，而是大任务更需要拆分和验收。

## 3. 给出验收标准

例如：

```text
完成后请运行 npm run build，并说明修改了哪些文件。
```

或者：

```text
不要提交 commit，只保留工作区改动，最后给我总结 diff。
```

明确验收标准后，工具的输出会稳定很多。

## 4. 保持 git 干净

开始前最好先确认：

```sh
git status
```

如果工作区已经有改动，要告诉 AI 哪些是已有改动，哪些可以修改。否则它可能会把你的手工改动和它自己的改动混在一起。

# 九、个人体验

我的感受是：**Claude Code CLI 更像一把锋利的命令行工具，Codex APP 更像一张可以展开工作的桌面。**

如果我已经很清楚要做什么，例如修一个明确 bug、解释一段日志、review 一段 diff，我会更倾向于 Claude Code CLI。它启动快、路径短，而且能自然接入命令行生态。

但如果任务需要读很多文件、写一篇完整文章、调页面、看截图、处理多个产物，我会更倾向于 Codex APP。它的优势不是某一次回答更聪明，而是整个过程更容易被观察和接管。

还有一点很明显：这类工具真正好用的前提不是“模型足够强”，而是“上下文足够清楚”。项目规则、任务边界、验收命令、禁止事项，这些写得越明确，AI 就越像队友；写得越模糊，它就越像一个随机发挥的实习生。

所以我的结论是：

- 终端重度用户：优先试 Claude Code CLI
- 想要可视化、长任务和多产物管理：优先试 Codex APP
- 团队项目：一定要写好 `CLAUDE.md` 或 `AGENTS.md`
- 重要修改：不要跳过 review 和测试

AI 编程工具已经不只是“帮我补全几行代码”的阶段了，它更像是在项目里开了一个新的协作入口。用得好，它可以显著减少重复劳动；用得急，它也会把问题放大。所以最重要的不是让它替我们思考，而是让它在清晰边界内替我们执行。

# 参考资料

- [Claude Code Overview](https://code.claude.com/docs/en/overview)
- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Claude Code Advanced Setup](https://code.claude.com/docs/en/setup)
- [ChatGPT Learn: Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [ChatGPT Learn: ChatGPT desktop app](https://learn.chatgpt.com/docs/app)
