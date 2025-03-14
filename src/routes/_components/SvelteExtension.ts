import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from '$lib';

import CounterComponent from './Counter.svelte';
import EditableComponent from './Editable.svelte';
import SlashCommand from './SlashCommand';

export const SvelteCounterExtension = Node.create({
  name: 'SvelteCounterComponent',
  group: 'block',
  atom: true,
  draggable: true,
  inline: false,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'svelte-counter-component' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['svelte-counter-component', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return SvelteNodeViewRenderer(CounterComponent);
  },
});

export const SvelteEditableExtension = Node.create({
  name: 'SvelteEditableComponent',
  group: 'block',
  content: 'inline*',
  draggable: true,

  parseHTML() {
    return [{ tag: 'svelte-editable-component' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['svelte-editable-component', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return SvelteNodeViewRenderer(EditableComponent);
  },
});


export const SlashCommandExtension = Node.create({
  name: 'SlashCommandComponent',
  group: 'block',
  content: 'inline*',
  draggable: false,

  parseHTML() {
    return [{ tag: 'svelte-slash-command' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['svelte-slash-command', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return SvelteNodeViewRenderer(SlashCommand);
  },
})