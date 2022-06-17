<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon name="underline" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="ol" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote" />
        </button>

      </div>
    </editor-menu-bar>
    <editor-content class="editor__content mt-3" :editor="editor" />
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  HardBreak,
  OrderedList,
  BulletList,
  Bold,
  Italic,
  Link,
  Underline,
  Placeholder,
  ListItem
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    Icon,
  },
  props: [ 'value' ],
  data () {
    return {
      editor: null,
    }
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        new ListItem(),
        new Blockquote(),
        new BulletList(),
        new HardBreak(),
        new OrderedList(),
        new Link(),
        new Bold(),
        new Italic(),
        new Underline(),
        new Placeholder({
          emptyNodeText: 'Patient handout details'
        }),
      ],
      content: this.value,
      onUpdate: ({ getHTML }) => {
        this.$emit('input', getHTML())
      },
    })
    this.editor.setContent(this.value)
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  watch: {
    value (val) {
      // so cursor doesn't jump to start on typing
    if (this.editor && val !== this.value) {
        this.editor.setContent(val, true)
      }
    }
  }
}
</script>
<style lang="scss">
.menubar__button {
  padding: .2rem .5rem;
  margin-right: .2rem;
  border-radius: 3px;
  cursor: pointer;
  display: inline-flex;
  font-weight: 700;
}
.menubar__button:hover {
  background-color: rgba(0,0,0,.05);
}
.menubar__button.is-active {
  background-color: rgba(0,0,0,.1);
}
.editor p.is-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
}
.ProseMirror {
  outline: none;
}
</style>