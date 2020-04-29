import {
  TemplateResult
} from 'lit-html';

/**
 * in-out: enter transition starts playing right away
 * out-in: enter transition only plays after leave completed
 */
export enum TransitionMode {
  InOut = "in-out",
  OutIn = "out-in",
  Both = "both"
}

export interface CSSClassSequence {
  active?: string
  from?: string
  to?: string
}

export interface CSSTransitionOptions {
  css?: TemplateResult|string|null
  duration?: Number
  enter?: CSSClassSequence|Boolean
  leave?: CSSClassSequence|Boolean
  mode?: TransitionMode
  onEnter?: Function
  onLeave?: Function
  onAfterEnter?: Function
  onAfterLeave?: Function
}
