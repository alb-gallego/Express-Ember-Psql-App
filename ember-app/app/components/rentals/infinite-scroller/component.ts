import { action } from '@ember/object';
import { cancel } from '@ember/runloop';
import { EmberRunTimer } from '@ember/runloop/types';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { resolve } from 'rsvp';
import { debounce } from '@ember/runloop';

const { round } = Math;

interface RentalsInfiniteScrollerArgs {
  onLoadMore(): () => void;
  canLoad: boolean;
}

type ScrollState = {
  isScrollable: boolean;
  scrollHeight: number;
  clientHeight: number;
  scrollTop: number;
  bottom: number;
  percent: number;
  percentScrolled: number;
  reachedBottom: boolean;
};
export default class RentalsInfiniteScroller extends Component<RentalsInfiniteScrollerArgs> {
  @tracked isLoading = false;
  @tracked isScrollable = false;
  #scroller: HTMLElement | null = null;
  #resizableObserver!: ResizeObserver;
  #debounceId: EmberRunTimer | null = null;
  percent: number = 80;

  setScroller = modifier((element: HTMLElement) => {
    this.#registerScroller(element);

    return () => this.#deregisterScroller();
  });

  @action
  handleWindowResize() {
    const hadScroll = this.isScrollable;
    this.#checkScrollable();
    if (hadScroll !== this.isScrollable) {
      this.checkLoadMore();
    }
  }

  #registerScroller(element: HTMLElement): void {
    this.#scroller = element;

    this.#startListening();
    this.#checkScrollable();
  }

  #deregisterScroller() {
    this.#stopListening();
    if (this.#debounceId) cancel(this.#debounceId);
    this.#scroller = null;
  }

  #startListening() {
    this.#scroller?.addEventListener('scroll', this.handleScroll);
    this.#resizableObserver = new ResizeObserver(this.handleWindowResize);
    if (this.#scroller) this.#resizableObserver.observe(this.#scroller);
  }

  #stopListening() {
    this.#scroller?.removeEventListener('scroll', this.handleScroll);
    if (this.#resizableObserver) this.#resizableObserver.disconnect();
  }

  @action
  handleScroll() {
    //@ts-expect-error try to fix in future
    this.#debounceId = debounce(this, 'checkShouldLoadMore', 100);
  }

  checkShouldLoadMore() {
    const scrollState = this.#getScrollState();

    const shouldLoadMore =
      (scrollState.reachedBottom && !this.isLoading && this.args.canLoad) ||
      !scrollState.isScrollable;
    if (shouldLoadMore) {
      this.loadMore();
    }
  }

  @action
  loadMore() {
    this.isLoading = true;
    resolve(this.args.onLoadMore?.()).finally(() => {
      this.isLoading = false;

      this.#checkScrollable();
    });
  }

  @action
  checkLoadMore() {
    const { isScrollable } = this.#getScrollState();
    this.isScrollable = isScrollable;
    if (!isScrollable) {
      //@ts-expect-error try to fix in future
      this.#debounceId = debounce(this, 'checkShouldLoadMore', 100);
    }
  }
  #checkScrollable() {
    if (this.isDestroying || this.isDestroyed) {
      return;
    }
    const scrollState = this.#getScrollState();
    this.isScrollable = scrollState.isScrollable;
  }

  #getScrollState(): ScrollState {
    const element: HTMLElement = this.#scroller ?? new HTMLElement();
    const scrollHeight = element.scrollHeight;
    const scrollTop = element.scrollTop;
    const clientHeight = element.clientHeight;
    const isScrollable = scrollHeight > clientHeight;
    const bottom = scrollHeight - clientHeight;
    const percent = this.percent;
    const percentScrolled = round((scrollTop / bottom) * 100);
    const reachedBottom = percentScrolled >= percent;

    return {
      isScrollable,
      scrollHeight,
      clientHeight,
      scrollTop,
      bottom,
      percent,
      percentScrolled,
      reachedBottom,
    };
  }
}
