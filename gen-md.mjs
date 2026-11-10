import fs from 'node:fs';
import path from 'node:path';
import { projects } from './src/data/zh.ts';

const out = path.resolve('..', '项目详情');
fs.mkdirSync(out, { recursive: true });
const asset = (p) => `../site/public/${p}`;

const sec = (s) => {
  const L = [];
  const add = (...x) => L.push(...x);
  add(`## ${s.title}`, '');
  switch (s.type) {
    case 'text':
      s.paras.forEach((p) => add(p, ''));
      break;
    case 'list':
      if (s.intro) add(s.intro, '');
      s.items.forEach((i) => add(`- ${i}`));
      add('');
      break;
    case 'flow':
      s.intro.forEach((p) => add(p, ''));
      s.steps.forEach((st, i) => add(`${i + 1}. **${st.t}**：${st.d}`));
      add('');
      (s.outro ?? []).forEach((p) => add(p, ''));
      break;
    case 'chart':
      s.intro.forEach((p) => add(p, ''));
      add('| 设置 | 最佳验证准确率 |', '| --- | ---: |');
      s.bars.forEach((b) => add(`| ${b.label} | ${b.value.toFixed(2)}% |`));
      add('');
      s.after.forEach((p) => add(p, ''));
      break;
    case 'stage':
      (s.intro ?? []).forEach((p) => add(p, ''));
      s.items.forEach((i) => add(`- **${i.label}**（${i.meta}）：${i.desc}　[视频](${asset(i.src)})`));
      add('', s.note, '');
      break;
    case 'viewer': {
      (s.intro ?? []).forEach((p) => add(p, ''));
      let tag = '';
      s.items.forEach((i) => {
        if (i.tag !== tag) {
          tag = i.tag;
          add(`### ${tag}`, '');
        }
        add(`**${i.title}**`, '', `![${i.title}](${asset(i.src)})`, '', i.caption, '');
        if (i.note) add(`> ${i.note}`, '');
      });
      if (s.credit) add(s.credit, '');
      if (s.after) {
        add(`### ${s.after.title}`, '');
        s.after.items.forEach((i) => add(`- **${i.label}**（${i.meta}）：${i.desc}　[视频](${asset(i.src)})`));
        add('', s.after.note, '');
      }
      break;
    }
    case 'stats':
      add('| 指标 | 数值 | 口径 |', '| --- | ---: | --- |');
      s.items.forEach((i) => add(`| ${i.label} | ${i.num.toFixed(i.dec)}${i.suffix} | ${i.note ?? ''} |`));
      add('');
      s.notes.forEach((n) => add(`- ${n}`));
      add('');
      break;
    case 'qa':
      (s.intro ?? []).forEach((p) => add(p, ''));
      s.items.forEach((i, k) => {
        add(`### Q${k + 1}. ${i.q}`, '', `*${i.tag}*`, '');
        i.a.forEach((p) => add(p, ''));
      });
      break;
    case 'predict':
      (s.intro ?? []).forEach((p) => add(p, ''));
      s.rows.forEach((r) => {
        add(`### ${r.topic}（预测${r.verdict}）`, '');
        add(`- **我的预测**：${r.predict}`, `- **实际结果**：${r.actual}`, `- **修正后的认识**：${r.lesson}`, '');
      });
      (s.after ?? []).forEach((p) => add(p, ''));
      break;
    case 'collab': {
      add(`> ${s.quote}`, '', s.lead, '');
      add('### 我在协作中承担的工作', '', '| 能力 | 项目中的具体做法 |', '| --- | --- |');
      s.abilities.forEach((a) => add(`| ${a.t} | ${a.d} |`));
      add('', '### 人与多个 Agent 如何分工', '', '| 参与者 | 主要职责 |', '| --- | --- |');
      s.roles.forEach((r) => add(`| ${r.who} | ${r.d} |`));
      add('', s.rolesNote, '', '### 我的协作方法', '');
      s.methods.forEach((m, i) => add(`${i + 1}. **${m.t}**：${m.d}`));
      add('', `### ${s.cases.length} 组代表性案例`, '');
      let g = '';
      s.cases.forEach((c, i) => {
        if (c.group !== g) {
          g = c.group;
          add(`#### ${g}`, '');
        }
        add(`##### ${i + 1}. ${c.title}`, '', `- **问题**：${c.problem}`, `- **我的干预**：${c.intervene}`, `- **AI 随后的修改**：${c.ai}`, `- **结果与边界**：${c.result}`, `- **依据**：${c.refs.map((r) => `[${r.label}](${r.url})`).join('、')}`, '');
      });
      s.notes.forEach((n) => add(n, ''));
      break;
    }
    case 'links': {
      let g = '';
      s.items.forEach((i) => {
        if (i.group && i.group !== g) {
          g = i.group;
          add('', `**${g}**`, '');
        }
        add(`- [${i.label}](${i.url})${i.desc ? `：${i.desc}` : ''}`);
      });
      add('');
      break;
    }
    case 'todo':
      s.items.forEach((i) => add(`- ${i}`));
      add('');
      break;
    default:
      throw new Error('unknown section ' + s.type);
  }
  return L.join('\n');
};

const files = { 'mobile-manipulator': '移动操作机器人', 'mini-vit': 'MiniViT', 'nnm-platform': '神经网络训练与模型管理平台' };
const nums = { 'mobile-manipulator': '1', 'mini-vit': '2', 'nnm-platform': '3' };
for (const p of projects) {
  const head = [
    `# ${p.title}${p.alias ? `（${p.alias}）` : ''}`,
    '',
    '> 本文件由网页中文版的项目内容整理而来，是 [profile.md](../profile.md) 第 4 节代表项目的详细版本；如网页文案修改，请同步更新。',
    '',
    `- **仓库**：[${p.repoLabel}](${p.repo})`,
    `- **性质**：${p.nature}`,
    `- **开始时间**：${p.start}`,
    `- **维护状态**：${p.status}`,
    `- **技术关键词**：${p.tags.join('、')}`,
    '',
    '## 项目概览',
    '',
    p.summary,
    '',
    '**个人贡献**',
    '',
    ...p.contribution.map((c) => `- ${c}`),
    '',
  ].join('\n');
  const body = p.sections.map(sec).join('\n');
  fs.writeFileSync(path.join(out, `${nums[p.slug]}-${files[p.slug]}.md`), head + '\n' + body.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');
}
console.log(fs.readdirSync(out));
