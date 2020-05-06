import {
  TemplateResult
} from 'lit-html';

/**
 * in-out: enter transition starts playing right away
 * out-in: enter transition only plays after leave completed
 * both: both transitions play immediately
 */
export enum TransitionMode {
  InOut = "in-out",
  OutIn = "out-in",
  Both = "both"
}

/**
 * in-out: enter transition starts playing right away
 * out-in: enter transition only plays after leave completed
 * both: both transitions play immediately
 */
export enum GeometryLockMode {
  None = 0,
  Lock = 1,
  Auto = 'auto',
}

export interface CSSClassSequence {
  // class applied throughout whole transition
  active?: string
  // class with initial props applied on first frame
  from?: string
  // class with target props applied after first frame
  to?: string,
  // lock behavior
  lock?: GeometryLockMode
}

export interface CSSTransitionOptions {
  // css string
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

export type CSSTransitionOptionsGenerator
  = (opts?:any) => CSSTransitionOptions;
