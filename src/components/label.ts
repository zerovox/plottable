///<reference path="../reference.ts" />

module Plottable {
export module Components {
  export class Label extends Component {

    // Css class for labels that are made for rendering titles.
    public static TITLE_LABEL_CLASS = "title-label";

    // Css class for labels that are made for rendering axis titles.
    public static AXIS_LABEL_CLASS = "axis-label";

    private _textContainer: D3.Selection;
    private _text: string; // text assigned to the Label; may not be the actual text displayed due to truncation
    private _orientation: string;
    private _measurer: SVGTypewriter.Measurers.Measurer;
    private _wrapper: SVGTypewriter.Wrappers.Wrapper;
    private _writer: SVGTypewriter.Writers.Writer;
    private _padding: number;

    /**
     * Creates a Label.
     *
     * A label is component that renders just text. The most common use of
     * labels is to create a title or axis labels.
     *
     * @constructor
     * @param {string} displayText The text of the Label (default = "").
     * @param {string} orientation The orientation of the Label (horizontal/left/right) (default = "horizontal").
     */
    constructor(displayText = "", orientation = "horizontal") {
      super();
      this.classed("label", true);
      this.text(displayText);
      this.orientation(orientation);
      this.xAlignment("center").yAlignment("center");
      this._fixedHeightFlag = true;
      this._fixedWidthFlag = true;
      this._padding = 0;
    }

    public requestedSpace(offeredWidth: number, offeredHeight: number): _SpaceRequest {
      var desiredWH = this._measurer.measure(this._text);
      var desiredWidth  = (this.orientation() === "horizontal" ? desiredWH.width : desiredWH.height) + 2 * this.padding();
      var desiredHeight = (this.orientation() === "horizontal" ? desiredWH.height : desiredWH.width) + 2 * this.padding();

      return {
        minWidth: desiredWidth,
        minHeight: desiredHeight
      };
    }

    protected _setup() {
      super._setup();
      this._textContainer = this._content.append("g");
      this._measurer = new SVGTypewriter.Measurers.Measurer(this._textContainer);
      this._wrapper = new SVGTypewriter.Wrappers.Wrapper();
      this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper);
      this.text(this._text);
    }

    /**
     * Gets the current text on the Label.
     *
     * @returns {string} the text on the label.
     */
    public text(): string;
    /**
     * Sets the current text on the Label.
     *
     * @param {string} displayText If provided, the new text for the Label.
     * @returns {Label} The calling Label.
     */
    public text(displayText: string): Label;
    public text(displayText?: string): any {
      if (displayText === undefined) {
        return this._text;
      } else {
        this._text = displayText;
        this.redraw();
        return this;
      }
    }

    /**
     * Gets the orientation of the Label.
     *
     * @returns {string} the current orientation.
     */
    public orientation(): string;
    /**
     * Sets the orientation of the Label.
     *
     * @param {string} newOrientation If provided, the desired orientation
     * (horizontal/left/right).
     * @returns {Label} The calling Label.
     */
    public orientation(orientation: string): Label;
    public orientation(orientation?: string): any {
      if (orientation == null) {
        return this._orientation;
      } else {
        orientation = orientation.toLowerCase();
        if (orientation === "horizontal" || orientation === "left" || orientation === "right") {
          this._orientation = orientation;
        } else {
          throw new Error(orientation + " is not a valid orientation for LabelComponent");
        }
        this.redraw();
        return this;
      }
    }

    /**
     * Gets the amount of padding in pixels around the Label.
     *
     * @returns {number} the current padding amount.
     */
    public padding(): number;
    /**
     * Sets the amount of padding in pixels around the Label.
     *
     * @param {number} padAmount The desired padding amount in pixel values
     * @returns {Label} The calling Label.
     */
    public padding(padAmount: number): Label;
    public padding(padAmount?: number): any {
      if (padAmount == null) {
        return this._padding;
      } else {
        padAmount = +padAmount;
        if (padAmount < 0) {
          throw new Error(padAmount + " is not a valid padding value.  Cannot be less than 0.");
        }
        this._padding = padAmount;
        this.redraw();
        return this;
      }
    }

    protected _render() {
      super._render();
      // HACKHACK SVGTypewriter should remove existing content - #21 on SVGTypewriter.
      this._textContainer.selectAll("g").remove();
      var textMeasurement = this._measurer.measure(this._text);
      var heightPadding = Math.max(Math.min((this.height() - textMeasurement.height) / 2, this.padding()), 0);
      var widthPadding = Math.max(Math.min((this.width() - textMeasurement.width) / 2, this.padding()), 0);
      this._textContainer.attr("transform", "translate(" + widthPadding + "," + heightPadding + ")");
      var writeWidth = this.width() - 2 * widthPadding;
      var writeHeight = this.height() - 2 * heightPadding;
      var textRotation: {[s: string]: number} = {horizontal: 0, right: 90, left: -90};
      var writeOptions = {
                        selection: this._textContainer,
                        xAlign: this.xAlignment(),
                        yAlign: this.yAlignment(),
                        textRotation: textRotation[this.orientation()]
                    };
      this._writer.write(this._text, writeWidth, writeHeight, writeOptions);
    }
  }
}
}
