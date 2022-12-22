import {
  Component,
  h,
  Prop,
  State,
  Listen,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";
import {
  onComponentRequiredPropUndefined,
  isSlotUsed,
} from "../../utils/helpers";
import { IcChipAppearance, IcChipSizes } from "./ic-chip.types";
import dismissIcon from "../../assets/dismiss-icon.svg";

/**
 * @slot icon - Content will be rendered at the start of the chip.
 */
@Component({
  tag: "ic-chip",
  styleUrl: "ic-chip.css",
  shadow: true,
})
export class Chip {
  @Element() el: HTMLIcChipElement;
  /**
   * If `true`, the chip will be clickable instead of static.
   */
  @Prop({ mutable: true }) clickable?: boolean = false;
  /**
   * The text rendered within the chip.
   */
  @Prop() label!: string;
  /**
   * The emphasis of the chip.
   */
  @Prop() appearance?: IcChipAppearance = "filled";
  /**
   * The size of the chip.
   */
  @Prop() size?: IcChipSizes = "default";
  /**
   * If `true`, the chip will have a close button at the end to dismiss it.
   */
  @Prop() dismissible?: boolean = false;
  /**
   * The URL for clickable chips.
   */
  @Prop() href?: string | undefined;
  /**
   * The human-readable explanation of the URL.
   */
  @Prop() hreflang?: string = "";
  /**
   * How much of the referrer to send when following the link.
   */
  @Prop() referrerpolicy?: ReferrerPolicy;
  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @Prop() rel?: string;
  /**
   * Where to display the linked URL, as the name for a browsing context (a tab, window, or iframe).
   */
  @Prop() target?: string;
  /**
   * If `true`, and the chip is clickable, it will be disabled.
   */
  @Prop() disabled?: boolean = false;

  @State() parentIsAnchorTag: boolean = false;

  @State() parentEl: HTMLElement | null = null;

  @State() visible: boolean = true;

  @State() isFocussed: boolean = false;

  @Listen("click", { capture: true })
  handleHostClick(event: Event): void {
    if (this.disabled) {
      event.stopImmediatePropagation();
    }
  }

  @Listen("dismiss", { capture: true })
  handleClick(): void {
    this.visible = !this.visible;
  }
  /**
   * Is emitted when the user dismisses the chip.
   */
  @Event() dismiss: EventEmitter<void>;

  private dismissAction = (event: MouseEvent): void => {
    event.stopPropagation();
    this.dismiss.emit();
  };

  private parentFocussed = (): void => {
    this.isFocussed = true;
  };

  private parentBlurred = (): void => {
    this.isFocussed = false;
  };

  componentWillLoad(): void {
    this.parentEl = this.el.parentElement;

    if (this.parentEl.tagName === "A") {
      this.clickable = true;
      this.parentIsAnchorTag = true;
      this.parentEl.addEventListener("focus", this.parentFocussed);
      this.parentEl.addEventListener("blur", this.parentBlurred);
    }
  }

  disconnectedCallback(): void {
    if (this.parentIsAnchorTag) {
      this.parentEl.removeEventListener("focus", this.parentFocussed);
      this.parentEl.removeEventListener("blur", this.parentBlurred);
    }
  }

  componentDidLoad(): void {
    onComponentRequiredPropUndefined(
      [{ prop: this.label, propName: "label" }],
      "Chip"
    );
  }

  render() {
    const {
      label,
      appearance,
      size,
      dismissible,
      visible,
      clickable,
      disabled,
      parentIsAnchorTag,
      isFocussed,
      href,
      hreflang,
      referrerpolicy,
      rel,
      target,
    } = this;

    const Component = parentIsAnchorTag
      ? "div"
      : clickable
      ? this.href === undefined
        ? "button"
        : "a"
      : "div";

    const attrs = Component == "a" && {
      href: href,
      hrefLang: hreflang,
      referrerPolicy: referrerpolicy,
      rel: rel,
      target: target,
    };

    return (
      visible && (
        <div class="container">
          <Component
            class={{
              ["chip"]: true,
              [`${appearance}`]: true,
              [`${size}`]: true,
              ["clickable"]: clickable && !disabled,
              ["disabled"]: disabled,
              ["focussed"]: isFocussed,
              ["dismissible"]: dismissible,
            }}
            tabindex={clickable && !parentIsAnchorTag ? 0 : -1}
            aria-disabled={disabled ? "true" : null}
            disabled={disabled ? true : null}
            {...attrs}
          >
            <div class="content-container">
              {isSlotUsed(this.el, "icon") && (
                <div class="icon">
                  <slot name="icon" />
                </div>
              )}
              <ic-typography
                variant="label"
                apply-vertical-margins={false}
                class="label"
              >
                <span>{label}</span>
              </ic-typography>
            </div>
          </Component>
          {dismissible && (
            <ic-tooltip
              label="Dismiss"
              target="dismiss-icon"
              class={{ ["tooltip-disabled"]: disabled }}
            >
              <button
                id="dismiss-icon"
                class={{
                  ["dismiss-icon"]: true,
                }}
                aria-label={`Dismiss ${label}`}
                disabled={disabled}
                tabindex={disabled ? -1 : 0}
                onClick={this.dismissAction}
                innerHTML={dismissIcon}
              ></button>
            </ic-tooltip>
          )}
        </div>
      )
    );
  }
}
