import { Editor, Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import tippy from 'tippy.js';
import CommandList from "./CommandList.svelte";
import getSuggestionItems from "./slashItems";
import { mount, unmount } from "svelte";

const Commands = Extension.create({
  name: "slash",

  defaultOptions: {
    suggestion: {
      char: "/",
      startOfLine: false,
      command: ({ editor, range, props }) => {
        props.command({ editor, range, props });
      }
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
});

const renderItems = () => {
  let component: any;
  let popup: any | null = null;
  let propState;
  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      // component = new SvelteRenderer(CommandList, {
      // 	props,
      // 	editor: props.editor
      // });
      propState = props
      // component.dom;
      const el = document.createElement('div');
      component = mount(CommandList, {
        target: el,
        props: propState as any
      });

      popup = (tippy as any)('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: el,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start'
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      propState = props

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect
        });
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        popup?.[0].hide();

        return true;
      }

      // return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0].destroy();
      // component?.destroy();
      unmount(component as any)
    }
  };
};
const SlashCommand = Commands.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems
  }
})
export default SlashCommand;