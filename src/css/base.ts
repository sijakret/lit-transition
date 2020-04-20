import {
  TemplateResult
} from 'lit-html';

enum TransitionMode {
  InOut = "in-out",
  OutIn = "out-in"
}

export interface CSSClassSequence {
  active?: string
  from?: string
  to?: string
}

export interface CSSTransitionOptions {
  css?: TemplateResult|string|null
  enter?: CSSClassSequence|Boolean
  leave?: CSSClassSequence|Boolean
  mode?: TransitionMode
}
