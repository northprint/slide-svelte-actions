<script lang="ts">
	import Slide from './slide.svelte';
	import Code from './code.svelte';
	import Markdown from './markdown.svelte';
	import { tooltip } from './tooltip';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/material.css';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import type { Props } from 'tippy.js';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'top'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});

	let tippyContent = 'Hello!';

	function tippyTooltip(node: HTMLElement, options: Partial<Props> | undefined) {
		const tooltip = tippy(node, options);

		return {
			update(options: Partial<Props> | undefined) {
				if (!options) return;
				tooltip.setProps(options);
			},
			destroy() {
				tooltip.destroy();
			}
		};
	}
</script>

<Slide>SvelteのActionってどんなもの？<br /><span class="text-xl">〜Melt UIを添えて〜</span></Slide>

<Slide animate>
	<ul>
		<li class="list-none">Svelteのactionとは？</li>
	</ul>
</Slide>

<Slide animate>
	<ul>
		<li class="list-none">Svelteのactionとは？</li>
		<li class="list-none">HTML要素に対して簡単に動作や効果を追加するための再利用可能な関数です</li>
	</ul>
</Slide>

<Slide animate>
	<ul>
		<li class="list-none">Svelteのactionとは？</li>
		<li class="list-none">HTML要素に対して簡単に動作や効果を追加するための再利用可能な関数です</li>
		<li class="list-none text-xl">
			たとえば、クリック時のエフェクトやスクロールの処理、ホバー時にツールチップを表示するなど、特定の要素に対して追加したい振る舞いを、Svelteのアクションを使ってシンプルに実装できます
		</li>
	</ul>
</Slide>

<Slide animate>
	<button
		use:tooltip={'クリックして詳細を表示'}
		class="rounded bg-blue-500 px-4 py-2 text-2xl font-bold text-white hover:bg-blue-700"
	>
		ホバーでツールチップ表示
	</button>

	<Code id="code" lines>
		{`
<button use:tooltip={"クリックして詳細を表示"} class="…">
    ホバーでツールチップ表示
</button>
`}
	</Code>
</Slide>

<Slide animate>
	<Code id="code" lines>
		{`
export function tooltip(node: HTMLElement, text: string) {
    let tooltipElement: HTMLDivElement | null = null;

    const showTooltip = () => {
        tooltipElement = document.createElement('div');
        tooltipElement.textContent = text;
        〜省略〜
    };

    const hideTooltip = () => {
        if (tooltipElement) {
            tooltipElement.remove();
            tooltipElement = null;
        }
	};
	node.addEventListener('mouseenter', showTooltip);
	node.addEventListener('mouseleave', hideTooltip);

	return {
		destroy() {
			node.removeEventListener('mouseenter', showTooltip);
			node.removeEventListener('mouseleave', hideTooltip);
		}
	};
}
	 `}
	</Code>
</Slide>

<Slide animate>外部ライブラリを使ったアクションの実装例</Slide>

<Slide animate>
	<input bind:value={tippyContent} class="text-xl text-black" />
	<button
		use:tippyTooltip={{ content: tippyContent, theme: 'material' }}
		class="rounded bg-blue-500 px-4 py-2 text-2xl font-bold text-white hover:bg-blue-700"
	>
		Hover me
	</button>

	<Code id="code" lines>
		{`

	let content = 'Hello!'';
	function tooltip(node, options) {
		const tooltip = tippy(node, options);

		return {
			update(options) {
				tooltip.setProps(options);
			},
			destroy() {
				tooltip.destroy();
			}
		};
	}

// 以下ビューのブロック
<input bind:value={content} />

<button use:tooltip={{ content, theme: 'material' }}>
	Hover me
</button>
`}
	</Code>
</Slide>

<Slide animate>
	<p>これを踏まえて</p>
	<p>Melt UIのアクションを見ていきましょう</p>
</Slide>

<Slide animate>
	<button type="button" class="trigger" use:melt={$trigger} aria-label="Add"> Melt UI </button>
	{#if $open}
		<div
			use:melt={$content}
			transition:fade={{ duration: 100 }}
			class=" z-10 rounded-lg bg-white shadow"
		>
			<div use:melt={$arrow} />
			<p class="px-4 py-1 text-magnum-700">Add item to library</p>
		</div>
	{/if}

	<Code id="code" lines>
		{`
	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = createTooltip({
		positioning: {
			placement: 'top',
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true,
	});

	<button type="button" class="trigger" use:melt={$trigger} aria-label="Add">
		Melt UI
	</button>
	{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class=" z-10 rounded-lg bg-white shadow"
	>
		<div use:melt={$arrow} />
		<p class="px-4 py-1 text-magnum-700">Add item to library</p>
	</div>
	{/if}
		`}
	</Code>
</Slide>

<Slide animate>
	<ul>
		<li class="list-none">まとめ</li>
	</ul>
</Slide>
<Slide animate>
	<ul>
		<li class="list-none">まとめ</li>
		<p class="text-3xl">アクションは、Svelteの強力な機能の一つです</p>
	</ul>
</Slide>
<Slide animate>
	<ul>
		<li class="list-none">まとめ</li>
		<p class="text-3xl">アクションは、Svelteの強力な機能の一つです</p>
		<p class="text-3xl">外部ライブラリを使ったアクションの実装も可能です</p>
	</ul>
</Slide>
<Slide animate>
	<ul>
		<li class="list-none">まとめ</li>
		<p class="text-3xl">アクションは、Svelteの強力な機能の一つです</p>
		<p class="text-3xl">外部ライブラリを使ったアクションの実装も可能です</p>
		<p class="text-3xl">Melt UIのアクションを使って、ツールチップを表示する例を紹介しました</p>
	</ul>
</Slide>

<style lang="postcss">
	.trigger {
		@apply inline-flex h-20 w-20 items-center justify-center rounded-full bg-white;
		@apply text-magnum-900 transition-colors hover:bg-white/90;
		@apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
		@apply p-0 text-sm font-medium;
	}
</style>
