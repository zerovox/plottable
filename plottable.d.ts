
declare module Plottable {
    module Utils {
        module Methods {
            /**
             * Checks if x is between a and b.
             *
             * @param {number} x The value to test if in range
             * @param {number} a The beginning of the (inclusive) range
             * @param {number} b The ending of the (inclusive) range
             * @return {boolean} Whether x is in [a, b]
             */
            function inRange(x: number, a: number, b: number): boolean;
            /**
             * Clamps x to the range [min, max].
             *
             * @param {number} x The value to be clamped.
             * @param {number} min The minimum value.
             * @param {number} max The maximum value.
             * @return {number} A clamped value in the range [min, max].
             */
            function clamp(x: number, min: number, max: number): number;
            /** Print a warning message to the console, if it is available.
             *
             * @param {string} The warnings to print
             */
            function warn(warning: string): void;
            /**
             * Takes two arrays of numbers and adds them together
             *
             * @param {number[]} alist The first array of numbers
             * @param {number[]} blist The second array of numbers
             * @return {number[]} An array of numbers where x[i] = alist[i] + blist[i]
             */
            function addArrays(alist: number[], blist: number[]): number[];
            /**
             * Takes two sets and returns the intersection
             *
             * Due to the fact that D3.Sets store strings internally, return type is always a string set
             *
             * @param {D3.Set<T>} set1 The first set
             * @param {D3.Set<T>} set2 The second set
             * @return {D3.Set<string>} A set that contains elements that appear in both set1 and set2
             */
            function intersection<T>(set1: D3.Set<T>, set2: D3.Set<T>): D3.Set<string>;
            /**
             * Take an accessor object (may be a string to be made into a key, or a value, or a color code)
             * and "activate" it by turning it into a function in (datum, index, metadata)
             */
            function accessorize(accessor: any): _Accessor;
            /**
             * Takes two sets and returns the union
             *
             * Due to the fact that D3.Sets store strings internally, return type is always a string set
             *
             * @param {D3.Set<T>} set1 The first set
             * @param {D3.Set<T>} set2 The second set
             * @return {D3.Set<string>} A set that contains elements that appear in either set1 or set2
             */
            function union<T>(set1: D3.Set<T>, set2: D3.Set<T>): D3.Set<string>;
            /**
             * Populates a map from an array of keys and a transformation function.
             *
             * @param {string[]} keys The array of keys.
             * @param {(string, number) => T} transform A transformation function to apply to the keys.
             * @return {D3.Map<T>} A map mapping keys to their transformed values.
             */
            function populateMap<T>(keys: string[], transform: (key: string, index: number) => T): D3.Map<T>;
            /**
             * Take an array of values, and return the unique values.
             * Will work iff ∀ a, b, a.toString() == b.toString() => a == b; will break on Object inputs
             *
             * @param {T[]} values The values to find uniqueness for
             * @return {T[]} The unique values
             */
            function uniq<T>(arr: T[]): T[];
            /**
             * Creates an array of length `count`, filled with value or (if value is a function), value()
             *
             * @param {T | ((index?: number) => T)} value The value to fill the array with or a value generator (called with index as arg)
             * @param {number} count The length of the array to generate
             * @return {any[]}
             */
            function createFilledArray<T>(value: T | ((index?: number) => T), count: number): T[];
            /**
             * @param {T[][]} a The 2D array that will have its elements joined together.
             * @return {T[]} Every array in a, concatenated together in the order they appear.
             */
            function flatten<T>(a: T[][]): T[];
            /**
             * Check if two arrays are equal by strict equality.
             */
            function arrayEq<T>(a: T[], b: T[]): boolean;
            /**
             * @param {any} a Object to check against b for equality.
             * @param {any} b Object to check against a for equality.
             *
             * @returns {boolean} whether or not two objects share the same keys, and
             *          values associated with those keys. Values will be compared
             *          with ===.
             */
            function objEq(a: any, b: any): boolean;
            /**
             * Applies the accessor, if provided, to each element of `array` and returns the maximum value.
             * If no maximum value can be computed, returns defaultValue.
             */
            function max<C>(array: C[], defaultValue: C): C;
            function max<T, C>(array: T[], accessor: (t?: T, i?: number) => C, defaultValue: C): C;
            /**
             * Applies the accessor, if provided, to each element of `array` and returns the minimum value.
             * If no minimum value can be computed, returns defaultValue.
             */
            function min<C>(array: C[], defaultValue: C): C;
            function min<T, C>(array: T[], accessor: (t?: T, i?: number) => C, defaultValue: C): C;
            /**
             * Returns true **only** if x is NaN
             */
            function isNaN(n: any): boolean;
            /**
             * Returns true if the argument is a number, which is not NaN
             * Numbers represented as strings do not pass this function
             */
            function isValidNumber(n: any): boolean;
            /**
             * Creates shallow copy of map.
             * @param {{ [key: string]: any }} oldMap Map to copy
             *
             * @returns {[{ [key: string]: any }} coppied map.
             */
            function copyMap<T>(oldMap: {
                [key: string]: T;
            }): {
                [key: string]: T;
            };
            function range(start: number, stop: number, step?: number): number[];
            /** Is like setTimeout, but activates synchronously if time=0
             * We special case 0 because of an observed issue where calling setTimeout causes visible flickering.
             * We believe this is because when requestAnimationFrame calls into the paint function, as soon as that function finishes
             * evaluating, the results are painted to the screen. As a result, if we want something to occur immediately but call setTimeout
             * with time=0, then it is pushed to the call stack and rendered in the next frame, so the component that was rendered via
             * setTimeout appears out-of-sync with the rest of the plot.
             */
            function setTimeout(f: Function, time: number, ...args: any[]): number;
            function colorTest(colorTester: D3.Selection, className: string): string;
            function lightenColor(color: string, factor: number): string;
            function distanceSquared(p1: Point, p2: Point): number;
            function isIE(): boolean;
            /**
             * Returns true if the supplied coordinates or Extents intersect or are contained by bbox.
             *
             * @param {number | Extent} xValOrExtent The x coordinate or Extent to test
             * @param {number | Extent} yValOrExtent The y coordinate or Extent to test
             * @param {SVGRect} bbox The bbox
             * @param {number} tolerance Amount by which to expand bbox, in each dimension, before
             * testing intersection
             *
             * @returns {boolean} True if the supplied coordinates or Extents intersect or are
             * contained by bbox, false otherwise.
             */
            function intersectsBBox(xValOrExtent: number | Extent, yValOrExtent: number | Extent, bbox: SVGRect, tolerance?: number): boolean;
            /**
             * Create an Extent from a number or an object with "min" and "max" defined.
             *
             * @param {any} input The object to parse
             *
             * @returns {Extent} The generated Extent
             */
            function parseExtent(input: any): Extent;
        }
    }
}


declare module Plottable {
    module Utils {
        /**
         * An associative array that can be keyed by anything (inc objects).
         * Uses pointer equality checks which is why this works.
         * This power has a price: everything is linear time since it is actually backed by an array...
         */
        class StrictEqualityAssociativeArray {
            /**
             * Set a new key/value pair in the store.
             *
             * @param {any} key Key to set in the store
             * @param {any} value Value to set in the store
             * @return {boolean} True if key already in store, false otherwise
             */
            set(key: any, value: any): boolean;
            /**
             * Get a value from the store, given a key.
             *
             * @param {any} key Key associated with value to retrieve
             * @return {any} Value if found, undefined otherwise
             */
            get(key: any): any;
            /**
             * Test whether store has a value associated with given key.
             *
             * Will return true if there is a key/value entry,
             * even if the value is explicitly `undefined`.
             *
             * @param {any} key Key to test for presence of an entry
             * @return {boolean} Whether there was a matching entry for that key
             */
            has(key: any): boolean;
            /**
             * Return an array of the values in the key-value store
             *
             * @return {any[]} The values in the store
             */
            values(): any[];
            /**
             * Return an array of keys in the key-value store
             *
             * @return {any[]} The keys in the store
             */
            keys(): any[];
            /**
             * Execute a callback for each entry in the array.
             *
             * @param {(key: any, val?: any, index?: number) => any} callback The callback to eecute
             * @return {any[]} The results of mapping the callback over the entries
             */
            map(cb: (key?: any, val?: any, index?: number) => any): any[];
            /**
             * Delete a key from the key-value store. Return whether the key was present.
             *
             * @param {any} The key to remove
             * @return {boolean} Whether a matching entry was found and removed
             */
            delete(key: any): boolean;
        }
    }
}


declare module Plottable {
    module Utils {
        /**
         * Shim for ES6 set.
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
         */
        class Set<T> {
            constructor();
            add(value: T): Set<T>;
            delete(value: T): boolean;
            values(): T[];
        }
    }
}

declare module Plottable {
    module Utils {
        module DOM {
            /**
             * Gets the bounding box of an element.
             * @param {D3.Selection} element
             * @returns {SVGRed} The bounding box.
             */
            function getBBox(element: D3.Selection): SVGRect;
            var POLYFILL_TIMEOUT_MSEC: number;
            function requestAnimationFramePolyfill(fn: () => any): void;
            function isSelectionRemovedFromSVG(selection: D3.Selection): boolean;
            function getElementWidth(elem: HTMLScriptElement): number;
            function getElementHeight(elem: HTMLScriptElement): number;
            function getSVGPixelWidth(svg: D3.Selection): number;
            function translate(s: D3.Selection, x?: number, y?: number): any;
            function boxesOverlap(boxA: ClientRect, boxB: ClientRect): boolean;
            function boxIsInside(inner: ClientRect, outer: ClientRect): boolean;
            function getBoundingSVG(elem: SVGElement): SVGElement;
        }
    }
}


declare module Plottable {
    module Utils {
        module Colors {
            /**
             * Return contrast ratio between two colors
             * Based on implementation from chroma.js by Gregor Aisch (gka) (licensed under BSD)
             * chroma.js may be found here: https://github.com/gka/chroma.js
             * License may be found here: https://github.com/gka/chroma.js/blob/master/LICENSE
             * see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
             */
            function contrast(a: string, b: string): number;
        }
    }
}


declare module Plottable {
    module Utils {
        /**
         * A set of callbacks which can be all invoked at once.
         * Each callback exists at most once in the set (based on reference equality).
         * All callbacks should have the same signature.
         */
        class CallbackSet<CB extends Function> extends Set<CB> {
            callCallbacks(...args: any[]): CallbackSet<CB>;
        }
    }
}


declare module Plottable {
    type Formatter = (d: any) => string;
    var MILLISECONDS_IN_ONE_DAY: number;
    module Formatters {
        /**
         * Creates a formatter for currency values.
         *
         * @param {number} [precision] The number of decimal places to show (default 2).
         * @param {string} [symbol] The currency symbol to use (default "$").
         * @param {boolean} [prefix] Whether to prepend or append the currency symbol (default true).
         * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
         *
         * @returns {Formatter} A formatter for currency values.
         */
        function currency(precision?: number, symbol?: string, prefix?: boolean): (d: any) => string;
        /**
         * Creates a formatter that displays exactly [precision] decimal places.
         *
         * @param {number} [precision] The number of decimal places to show (default 3).
         * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
         *
         * @returns {Formatter} A formatter that displays exactly [precision] decimal places.
         */
        function fixed(precision?: number): (d: any) => string;
        /**
         * Creates a formatter that formats numbers to show no more than
         * [precision] decimal places. All other values are stringified.
         *
         * @param {number} [precision] The number of decimal places to show (default 3).
         * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
         *
         * @returns {Formatter} A formatter for general values.
         */
        function general(precision?: number): (d: any) => string;
        /**
         * Creates a formatter that stringifies its input.
         *
         * @returns {Formatter} A formatter that stringifies its input.
         */
        function identity(): (d: any) => string;
        /**
         * Creates a formatter for percentage values.
         * Multiplies the input by 100 and appends "%".
         *
         * @param {number} [precision] The number of decimal places to show (default 0).
         * @param {boolean} [onlyShowUnchanged] Whether to return a value if value changes after formatting (default true).
         *
         * @returns {Formatter} A formatter for percentage values.
         */
        function percentage(precision?: number): (d: any) => string;
        /**
         * Creates a formatter for values that displays [precision] significant figures
         * and puts SI notation.
         *
         * @param {number} [precision] The number of significant figures to show (default 3).
         *
         * @returns {Formatter} A formatter for SI values.
         */
        function siSuffix(precision?: number): (d: any) => string;
        /**
         * Creates a multi time formatter that displays dates.
         *
         * @returns {Formatter} A formatter for time/date values.
         */
        function multiTime(): (d: any) => string;
        /**
         * Creates a time formatter that displays time/date using given specifier.
         *
         * List of directives can be found on: https://github.com/mbostock/d3/wiki/Time-Formatting#format
         *
         * @param {string} [specifier] The specifier for the formatter.
         *
         * @returns {Formatter} A formatter for time/date values.
         */
        function time(specifier: string): Formatter;
        /**
         * Creates a formatter for relative dates.
         *
         * @param {number} baseValue The start date (as epoch time) used in computing relative dates (default 0)
         * @param {number} increment The unit used in calculating relative date values (default MILLISECONDS_IN_ONE_DAY)
         * @param {string} label The label to append to the formatted string (default "")
         *
         * @returns {Formatter} A formatter for time/date values.
         */
        function relativeDate(baseValue?: number, increment?: number, label?: string): (d: any) => string;
    }
}


declare module Plottable {
    /**
     * A SymbolFactory is a function that takes in a symbolSize which is the edge length of the render area
     * and returns a string representing the 'd' attribute of the resultant 'path' element
     */
    type SymbolFactory = (symbolSize: number) => string;
    module SymbolFactories {
        type StringAccessor = (datum: any, index: number) => string;
        function circle(): SymbolFactory;
        function square(): SymbolFactory;
        function cross(): SymbolFactory;
        function diamond(): SymbolFactory;
        function triangleUp(): SymbolFactory;
        function triangleDown(): SymbolFactory;
    }
}


declare module Plottable {
    module Utils {
        class ClientToSVGTranslator {
            static getTranslator(elem: SVGElement): ClientToSVGTranslator;
            constructor(svg: SVGElement);
            /**
             * Computes the position relative to the <svg> in svg-coordinate-space.
             */
            computePosition(clientX: number, clientY: number): Point;
        }
    }
}


declare module Plottable {
    module Configs {
        /**
         * Specifies if Plottable should show warnings.
         */
        var SHOW_WARNINGS: boolean;
    }
}


declare module Plottable {
    var version: string;
}


declare module Plottable {
    module Core {
        /**
         * Colors we use as defaults on a number of graphs.
         */
        class Colors {
            static CORAL_RED: string;
            static INDIGO: string;
            static ROBINS_EGG_BLUE: string;
            static FERN: string;
            static BURNING_ORANGE: string;
            static ROYAL_HEATH: string;
            static CONIFER: string;
            static CERISE_RED: string;
            static BRIGHT_SUN: string;
            static JACARTA: string;
            static PLOTTABLE_COLORS: string[];
        }
    }
}


declare module Plottable {
    module Core {
        /**
         * A class most other Plottable classes inherit from, in order to have a
         * unique ID.
         */
        class PlottableObject {
            getID(): number;
        }
    }
}


declare module Plottable {
    type DatasetCallback = (dataset: Dataset) => any;
    class Dataset extends Core.PlottableObject {
        /**
         * Constructs a new set.
         *
         * A Dataset is mostly just a wrapper around an any[], Dataset is the
         * data you're going to plot.
         *
         * @constructor
         * @param {any[]} data The data for this DataSource (default = []).
         * @param {any} metadata An object containing additional information (default = {}).
         */
        constructor(data?: any[], metadata?: any);
        onUpdate(callback: DatasetCallback): void;
        offUpdate(callback: DatasetCallback): void;
        /**
         * Gets the data.
         *
         * @returns {DataSource|any[]} The calling DataSource, or the current data.
         */
        data(): any[];
        /**
         * Sets the data.
         *
         * @param {any[]} data The new data.
         * @returns {Dataset} The calling Dataset.
         */
        data(data: any[]): Dataset;
        /**
         * Get the metadata.
         *
         * @returns {any} the current
         * metadata.
         */
        metadata(): any;
        /**
         * Set the metadata.
         *
         * @param {any} metadata The new metadata.
         * @returns {Dataset} The calling Dataset.
         */
        metadata(metadata: any): Dataset;
    }
}


declare module Plottable {
    module RenderPolicies {
        /**
         * A policy to render components.
         */
        interface RenderPolicy {
            render(): any;
        }
        /**
         * Never queue anything, render everything immediately. Useful for
         * debugging, horrible for performance.
         */
        class Immediate implements RenderPolicy {
            render(): void;
        }
        /**
         * The default way to render, which only tries to render every frame
         * (usually, 1/60th of a second).
         */
        class AnimationFrame implements RenderPolicy {
            render(): void;
        }
        /**
         * Renders with `setTimeout`. This is generally an inferior way to render
         * compared to `requestAnimationFrame`, but it's still there if you want
         * it.
         */
        class Timeout implements RenderPolicy {
            _timeoutMsec: number;
            render(): void;
        }
    }
}


declare module Plottable {
    /**
     * The RenderController is responsible for enqueueing and synchronizing
     * layout and render calls for Plottable components.
     *
     * Layouts and renders occur inside an animation callback
     * (window.requestAnimationFrame if available).
     *
     * If you require immediate rendering, call RenderController.flush() to
     * perform enqueued layout and rendering serially.
     *
     * If you want to always have immediate rendering (useful for debugging),
     * call
     * ```typescript
     * Plottable.RenderController.setRenderPolicy(
     *   new Plottable.RenderPolicy.Immediate()
     * );
     * ```
     */
    module RenderController {
        var _renderPolicy: RenderPolicies.RenderPolicy;
        function setRenderPolicy(policy: string | RenderPolicies.RenderPolicy): void;
        /**
         * If the RenderController is enabled, we enqueue the component for
         * render. Otherwise, it is rendered immediately.
         *
         * @param {Component} component Any Plottable component.
         */
        function registerToRender(component: Component): void;
        /**
         * If the RenderController is enabled, we enqueue the component for
         * layout and render. Otherwise, it is rendered immediately.
         *
         * @param {Component} component Any Plottable component.
         */
        function registerToComputeLayout(component: Component): void;
        /**
         * Render everything that is waiting to be rendered right now, instead of
         * waiting until the next frame.
         *
         * Useful to call when debugging.
         */
        function flush(): void;
    }
}

declare module Plottable {
    /**
     * Access specific datum property.
     */
    type _Accessor = (datum: any, index?: number, userMetadata?: any, plotMetadata?: Plots.PlotMetadata) => any;
    /**
     * Retrieves scaled datum property.
     */
    type _Projector = (datum: any, index: number, userMetadata: any, plotMetadata: Plots.PlotMetadata) => any;
    /**
     * Projector with applied user and plot metadata
     */
    type AppliedProjector = (datum: any, index: number) => any;
    /**
     * Defines a way how specific attribute needs be retrieved before rendering.
     */
    type _Projection = {
        accessor: _Accessor;
        scale?: Scale<any, any>;
        attribute: string;
    };
    /**
     * A mapping from attributes ("x", "fill", etc.) to the functions that get
     * that information out of the data.
     *
     * So if my data looks like `{foo: 5, bar: 6}` and I want the radius to scale
     * with both `foo` and `bar`, an entry in this type might be `{"r":
     * function(d) { return foo + bar; }`.
     */
    type AttributeToProjector = {
        [attrToSet: string]: _Projector;
    };
    type AttributeToAppliedProjector = {
        [attrToSet: string]: AppliedProjector;
    };
    /**
     * A simple bounding box.
     */
    type SelectionArea = {
        xMin: number;
        xMax: number;
        yMin: number;
        yMax: number;
    };
    type _SpaceRequest = {
        minWidth: number;
        minHeight: number;
    };
    /**
     * The range of your current data. For example, [1, 2, 6, -5] has the Extent
     * `{min: -5, max: 6}`.
     *
     * The point of this type is to hopefully replace the less-elegant `[min,
     * max]` extents produced by d3.
     */
    type Extent = {
        min: number;
        max: number;
    };
    /**
     * A simple location on the screen.
     */
    type Point = {
        x: number;
        y: number;
    };
    /**
     * The corners of a box.
     */
    type Bounds = {
        topLeft: Point;
        bottomRight: Point;
    };
}


declare module Plottable {
    class Domainer {
        /**
         * Constructs a new Domainer.
         *
         * @constructor
         * @param {(extents: any[][]) => any[]} combineExtents
         *        If present, this function will be used by the Domainer to merge
         *        all the extents that are present on a scale.
         *
         *        A plot may draw multiple things relative to a scale, e.g.
         *        different stocks over time. The plot computes their extents,
         *        which are a [min, max] pair. combineExtents is responsible for
         *        merging them all into one [min, max] pair. It defaults to taking
         *        the min of the first elements and the max of the second arguments.
         */
        constructor(combineExtents?: (extents: any[][]) => any[]);
        /**
         * @param {any[][]} extents The list of extents to be reduced to a single
         *        extent.
         * @param {QuantitativeScaleScale} scale
         *        Since nice() must do different things depending on Linear, Log,
         *        or Time scale, the scale must be passed in for nice() to work.
         * @returns {any[]} The domain, as a merging of all exents, as a [min, max]
         *                 pair.
         */
        computeDomain(extents: any[][], scale: QuantitativeScale<any>): any[];
        /**
         * Sets the Domainer to pad by a given ratio.
         *
         * @param {number} padProportion Proportionally how much bigger the
         *         new domain should be (0.05 = 5% larger).
         *
         *         A domainer will pad equal visual amounts on each side.
         *         On a linear scale, this means both sides are padded the same
         *         amount: [10, 20] will be padded to [5, 25].
         *         On a log scale, the top will be padded more than the bottom, so
         *         [10, 100] will be padded to [1, 1000].
         *
         * @returns {Domainer} The calling Domainer.
         */
        pad(padProportion?: number): Domainer;
        /**
         * Adds a padding exception, a value that will not be padded at either end of the domain.
         *
         * Eg, if a padding exception is added at x=0, then [0, 100] will pad to [0, 105] instead of [-2.5, 102.5].
         * If a key is provided, it will be registered under that key with standard map semantics. (Overwrite / remove by key)
         * If a key is not provided, it will be added with set semantics (Can be removed by value)
         *
         * @param {any} exception The padding exception to add.
         * @param {string} key The key to register the exception under.
         * @returns {Domainer} The calling domainer
         */
        addPaddingException(exception: any, key?: string): Domainer;
        /**
         * Removes a padding exception, allowing the domain to pad out that value again.
         *
         * If a string is provided, it is assumed to be a key and the exception associated with that key is removed.
         * If a non-string is provdied, it is assumed to be an unkeyed exception and that exception is removed.
         *
         * @param {any} keyOrException The key for the value to remove, or the value to remove
         * @return {Domainer} The calling domainer
         */
        removePaddingException(keyOrException: any): Domainer;
        /**
         * Adds an included value, a value that must be included inside the domain.
         *
         * Eg, if a value exception is added at x=0, then [50, 100] will expand to [0, 100] rather than [50, 100].
         * If a key is provided, it will be registered under that key with standard map semantics. (Overwrite / remove by key)
         * If a key is not provided, it will be added with set semantics (Can be removed by value)
         *
         * @param {any} value The included value to add.
         * @param {string} key The key to register the value under.
         * @returns {Domainer} The calling domainer
         */
        addIncludedValue(value: any, key?: string): Domainer;
        /**
         * Remove an included value, allowing the domain to not include that value gain again.
         *
         * If a string is provided, it is assumed to be a key and the value associated with that key is removed.
         * If a non-string is provdied, it is assumed to be an unkeyed value and that value is removed.
         *
         * @param {any} keyOrException The key for the value to remove, or the value to remove
         * @return {Domainer} The calling domainer
         */
        removeIncludedValue(valueOrKey: any): Domainer;
        /**
         * Extends the scale's domain so it starts and ends with "nice" values.
         *
         * @param {number} count The number of ticks that should fit inside the new domain.
         * @return {Domainer} The calling Domainer.
         */
        nice(count?: number): Domainer;
    }
}


declare module Plottable {
    interface ScaleCallback<S extends Scale<any, any>> {
        (scale: S): any;
    }
    module Scales {
        interface ExtentProvider<D> {
            (scale: Scale<D, any>): D[][];
        }
    }
    class Scale<D, R> extends Core.PlottableObject {
        _typeCoercer: (d: any) => any;
        protected _d3Scale: D3.Scale.Scale;
        /**
         * Constructs a new Scale.
         *
         * A Scale is a wrapper around a D3.Scale.Scale. A Scale is really just a
         * function. Scales have a domain (input), a range (output), and a function
         * from domain to range.
         *
         * @constructor
         * @param {D3.Scale.Scale} scale The D3 scale backing the Scale.
         */
        constructor(scale: D3.Scale.Scale);
        protected _getAllExtents(): D[][];
        protected _getExtent(): D[];
        onUpdate(callback: ScaleCallback<Scale<D, R>>): void;
        offUpdate(callback: ScaleCallback<Scale<D, R>>): void;
        protected _dispatchUpdate(): void;
        /**
         * Modifies the domain on the scale so that it includes the extent of all
         * perspectives it depends on. This will normally happen automatically, but
         * if you set domain explicitly with `plot.domain(x)`, you will need to
         * call this function if you want the domain to neccessarily include all
         * the data.
         *
         * Extent: The [min, max] pair for a Scale.QuantitativeScale, all covered
         * strings for a Scale.Category.
         *
         * Perspective: A combination of a Dataset and an Accessor that
         * represents a view in to the data.
         *
         * @returns {Scale} The calling Scale.
         */
        autoDomain(): Scale<D, R>;
        _autoDomainIfAutomaticMode(): void;
        /**
         * Computes the range value corresponding to a given domain value. In other
         * words, apply the function to value.
         *
         * @param {R} value A domain value to be scaled.
         * @returns {R} The range value corresponding to the supplied domain value.
         */
        scale(value: D): R;
        /**
         * Gets the domain.
         *
         * @returns {D[]} The current domain.
         */
        domain(): D[];
        /**
         * Sets the domain.
         *
         * @param {D[]} values If provided, the new value for the domain. On
         * a QuantitativeScaleScale, this is a [min, max] pair, or a [max, min] pair to
         * make the function decreasing. On Scale.Ordinal, this is an array of all
         * input values.
         * @returns {Scale} The calling Scale.
         */
        domain(values: D[]): Scale<D, R>;
        protected _getDomain(): any[];
        protected _setDomain(values: D[]): void;
        /**
         * Gets the range.
         *
         * In the case of having a numeric range, it will be a [min, max] pair. In
         * the case of string range (e.g. Scale.InterpolatedColor), it will be a
         * list of all possible outputs.
         *
         * @returns {R[]} The current range.
         */
        range(): R[];
        /**
         * Sets the range.
         *
         * In the case of having a numeric range, it will be a [min, max] pair. In
         * the case of string range (e.g. Scale.InterpolatedColor), it will be a
         * list of all possible outputs.
         *
         * @param {R[]} values If provided, the new values for the range.
         * @returns {Scale} The calling Scale.
         */
        range(values: R[]): Scale<D, R>;
        /**
         * Constructs a copy of the Scale with the same domain and range but without
         * any registered listeners.
         *
         * @returns {Scale} A copy of the calling Scale.
         */
        copy(): Scale<D, R>;
        addExtentProvider(provider: Scales.ExtentProvider<D>): void;
        removeExtentProvider(provider: Scales.ExtentProvider<D>): void;
    }
}


declare module Plottable {
    class QuantitativeScale<D> extends Scale<D, number> {
        protected _d3Scale: D3.Scale.QuantitativeScale;
        _userSetDomainer: boolean;
        _typeCoercer: (d: any) => number;
        /**
         * Constructs a new QuantitativeScaleScale.
         *
         * A QuantitativeScaleScale is a Scale that maps anys to numbers. It
         * is invertible and continuous.
         *
         * @constructor
         * @param {D3.Scale.QuantitativeScaleScale} scale The D3 QuantitativeScaleScale
         * backing the QuantitativeScaleScale.
         */
        constructor(scale: D3.Scale.QuantitativeScale);
        protected _getExtent(): D[];
        /**
         * Retrieves the domain value corresponding to a supplied range value.
         *
         * @param {number} value: A value from the Scale's range.
         * @returns {D} The domain value corresponding to the supplied range value.
         */
        invert(value: number): D;
        /**
         * Creates a copy of the QuantitativeScaleScale with the same domain and range but without any registered list.
         *
         * @returns {QuantitativeScale} A copy of the calling QuantitativeScaleScale.
         */
        copy(): QuantitativeScale<D>;
        domain(): D[];
        domain(values: D[]): QuantitativeScale<D>;
        protected _setDomain(values: D[]): void;
        /**
         * Sets or gets the QuantitativeScaleScale's output interpolator
         *
         * @param {D3.Transition.Interpolate} [factory] The output interpolator to use.
         * @returns {D3.Transition.Interpolate|QuantitativeScale} The current output interpolator, or the calling QuantitativeScaleScale.
         */
        interpolate(): D3.Transition.Interpolate;
        interpolate(factory: D3.Transition.Interpolate): QuantitativeScale<D>;
        /**
         * Sets the range of the QuantitativeScaleScale and sets the interpolator to d3.interpolateRound.
         *
         * @param {number[]} values The new range value for the range.
         */
        rangeRound(values: number[]): QuantitativeScale<D>;
        /**
         * Gets ticks generated by the default algorithm.
         */
        getDefaultTicks(): D[];
        /**
         * Gets the clamp status of the QuantitativeScaleScale (whether to cut off values outside the ouput range).
         *
         * @returns {boolean} The current clamp status.
         */
        clamp(): boolean;
        /**
         * Sets the clamp status of the QuantitativeScaleScale (whether to cut off values outside the ouput range).
         *
         * @param {boolean} clamp Whether or not to clamp the QuantitativeScaleScale.
         * @returns {QuantitativeScale} The calling QuantitativeScaleScale.
         */
        clamp(clamp: boolean): QuantitativeScale<D>;
        /**
         * Gets a set of tick values spanning the domain.
         *
         * @returns {any[]} The generated ticks.
         */
        ticks(): any[];
        /**
         * Gets the default number of ticks.
         *
         * @returns {number} The default number of ticks.
         */
        numTicks(): number;
        /**
         * Sets the default number of ticks to generate.
         *
         * @param {number} count The new default number of ticks.
         * @returns {QuantitativeScale} The calling QuantitativeScaleScale.
         */
        numTicks(count: number): QuantitativeScale<D>;
        /**
         * Given a domain, expands its domain onto "nice" values, e.g. whole
         * numbers.
         */
        _niceDomain(domain: any[], count?: number): any[];
        /**
         * Gets a Domainer of a scale. A Domainer is responsible for combining
         * multiple extents into a single domain.
         *
         * @return {Domainer} The scale's current domainer.
         */
        domainer(): Domainer;
        /**
         * Sets a Domainer of a scale. A Domainer is responsible for combining
         * multiple extents into a single domain.
         *
         * When you set domainer, we assume that you know what you want the domain
         * to look like better that we do. Ensuring that the domain is padded,
         * includes 0, etc., will be the responsability of the new domainer.
         *
         * @param {Domainer} domainer If provided, the new domainer.
         * @return {QuantitativeScale} The calling QuantitativeScaleScale.
         */
        domainer(domainer: Domainer): QuantitativeScale<D>;
        _defaultExtent(): any[];
        /**
         * Gets the tick generator of the QuantitativeScale.
         *
         * @returns {TickGenerator} The current tick generator.
         */
        tickGenerator(): Scales.TickGenerators.TickGenerator<D>;
        /**
         * Sets a tick generator
         *
         * @param {TickGenerator} generator, the new tick generator.
         * @return {QuantitativeScale} The calling QuantitativeScale.
         */
        tickGenerator(generator: Scales.TickGenerators.TickGenerator<D>): QuantitativeScale<D>;
    }
}


declare module Plottable {
    module Scales {
        class Linear extends QuantitativeScale<number> {
            /**
             * Constructs a new LinearScale.
             *
             * This scale maps from domain to range with a simple `mx + b` formula.
             *
             * @constructor
             * @param {D3.Scale.LinearScale} [scale] The D3 LinearScale backing the
             * LinearScale. If not supplied, uses a default scale.
             */
            constructor();
            constructor(scale: D3.Scale.LinearScale);
            /**
             * Constructs a copy of the LinearScale with the same domain and range but
             * without any registered listeners.
             *
             * @returns {Linear} A copy of the calling LinearScale.
             */
            copy(): Linear;
        }
    }
}


declare module Plottable {
    module Scales {
        class Log extends QuantitativeScale<number> {
            /**
             * Constructs a new Scale.Log.
             *
             * Warning: Log is deprecated; if possible, use ModifiedLog. Log scales are
             * very unstable due to the fact that they can't handle 0 or negative
             * numbers. The only time when you would want to use a Log scale over a
             * ModifiedLog scale is if you're plotting very small data, such as all
             * data < 1.
             *
             * @constructor
             * @param {D3.Scale.LogScale} [scale] The D3 Scale.Log backing the Scale.Log. If not supplied, uses a default scale.
             */
            constructor();
            constructor(scale: D3.Scale.LogScale);
            /**
             * Creates a copy of the Scale.Log with the same domain and range but without any registered listeners.
             *
             * @returns {Log} A copy of the calling Log.
             */
            copy(): Log;
            _defaultExtent(): number[];
        }
    }
}


declare module Plottable {
    module Scales {
        class ModifiedLog extends QuantitativeScale<number> {
            /**
             * Creates a new Scale.ModifiedLog.
             *
             * A ModifiedLog scale acts as a regular log scale for large numbers.
             * As it approaches 0, it gradually becomes linear. This means that the
             * scale won't freak out if you give it 0 or a negative number, where an
             * ordinary Log scale would.
             *
             * However, it does mean that scale will be effectively linear as values
             * approach 0. If you want very small values on a log scale, you should use
             * an ordinary Scale.Log instead.
             *
             * @constructor
             * @param {number} [base]
             *        The base of the log. Defaults to 10, and must be > 1.
             *
             *        For base <= x, scale(x) = log(x).
             *
             *        For 0 < x < base, scale(x) will become more and more
             *        linear as it approaches 0.
             *
             *        At x == 0, scale(x) == 0.
             *
             *        For negative values, scale(-x) = -scale(x).
             */
            constructor(base?: number);
            scale(x: number): number;
            invert(x: number): number;
            protected _getDomain(): number[];
            protected _setDomain(values: number[]): void;
            ticks(count?: number): number[];
            copy(): ModifiedLog;
            _niceDomain(domain: any[], count?: number): any[];
            /**
             * Gets whether or not to return tick values other than powers of base.
             *
             * This defaults to false, so you'll normally only see ticks like
             * [10, 100, 1000]. If you turn it on, you might see ticks values
             * like [10, 50, 100, 500, 1000].
             * @returns {boolean} the current setting.
             */
            showIntermediateTicks(): boolean;
            /**
             * Sets whether or not to return ticks values other than powers or base.
             *
             * @param {boolean} show If provided, the desired setting.
             * @returns {ModifiedLog} The calling ModifiedLog.
             */
            showIntermediateTicks(show: boolean): ModifiedLog;
        }
    }
}


declare module Plottable {
    module Scales {
        class Category extends Scale<string, number> {
            protected _d3Scale: D3.Scale.OrdinalScale;
            _typeCoercer: (d: any) => any;
            /**
             * Creates a CategoryScale.
             *
             * A CategoryScale maps strings to numbers. A common use is to map the
             * labels of a bar plot (strings) to their pixel locations (numbers).
             *
             * @constructor
             */
            constructor(scale?: D3.Scale.OrdinalScale);
            protected _getExtent(): string[];
            domain(): string[];
            domain(values: string[]): Category;
            protected _setDomain(values: string[]): void;
            range(): number[];
            range(values: number[]): Category;
            /**
             * Returns the width of the range band.
             *
             * @returns {number} The range band width
             */
            rangeBand(): number;
            /**
             * Returns the step width of the scale.
             *
             * The step width is defined as the entire space for a band to occupy,
             * including the padding in between the bands.
             *
             * @returns {number} the full band width of the scale
             */
            stepWidth(): number;
            /**
             * Returns the inner padding of the scale.
             *
             * The inner padding is defined as the padding in between bands on the scale.
             * Units are a proportion of the band width (value returned by rangeBand()).
             *
             * @returns {number} The inner padding of the scale
             */
            innerPadding(): number;
            /**
             * Sets the inner padding of the scale.
             *
             * The inner padding of the scale is defined as the padding in between bands on the scale.
             * Units are a proportion of the band width (value returned by rangeBand()).
             *
             * @returns {Ordinal} The calling Scale.Ordinal
             */
            innerPadding(innerPadding: number): Category;
            /**
             * Returns the outer padding of the scale.
             *
             * The outer padding is defined as the padding in between the outer bands and the edges on the scale.
             * Units are a proportion of the band width (value returned by rangeBand()).
             *
             * @returns {number} The outer padding of the scale
             */
            outerPadding(): number;
            /**
             * Sets the outer padding of the scale.
             *
             * The inner padding of the scale is defined as the padding in between bands on the scale.
             * Units are a proportion of the band width (value returned by rangeBand()).
             *
             * @returns {Ordinal} The calling Scale.Ordinal
             */
            outerPadding(outerPadding: number): Category;
            copy(): Category;
            scale(value: string): number;
        }
    }
}


declare module Plottable {
    module Scales {
        class Color extends Scale<string, string> {
            /**
             * Constructs a ColorScale.
             *
             * @constructor
             * @param {string} [scaleType] the type of color scale to create
             *     (Category10/Category20/Category20b/Category20c).
             * See https://github.com/mbostock/d3/wiki/Ordinal-Scales#categorical-colors
             */
            constructor(scaleType?: string);
            protected _getExtent(): string[];
            scale(value: string): string;
        }
    }
}


declare module Plottable {
    module Scales {
        class Time extends QuantitativeScale<any> {
            _typeCoercer: (d: any) => any;
            /**
             * Constructs a TimeScale.
             *
             * A TimeScale maps Date objects to numbers.
             *
             * @constructor
             * @param {D3.Scale.Time} scale The D3 LinearScale backing the Scale.Time. If not supplied, uses a default scale.
             */
            constructor();
            constructor(scale: D3.Scale.LinearScale);
            tickInterval(interval: D3.Time.Interval, step?: number): any[];
            protected _setDomain(values: any[]): void;
            copy(): Time;
            _defaultExtent(): any[];
        }
    }
}


declare module Plottable {
    module Scales {
        /**
         * This class implements a color scale that takes quantitive input and
         * interpolates between a list of color values. It returns a hex string
         * representing the interpolated color.
         *
         * By default it generates a linear scale internally.
         */
        class InterpolatedColor extends Scale<number, string> {
            /**
             * Constructs an InterpolatedColorScale.
             *
             * An InterpolatedColorScale maps numbers evenly to color strings.
             *
             * @constructor
             * @param {string|string[]} colorRange the type of color scale to
             *     create. Default is "reds". @see {@link colorRange} for further
             *     options.
             * @param {string} scaleType the type of underlying scale to use
             *     (linear/pow/log/sqrt). Default is "linear". @see {@link scaleType}
             *     for further options.
             */
            constructor(colorRange?: any, scaleType?: string);
            /**
             * Gets the color range.
             *
             * @returns {string[]} the current color values for the range as strings.
             */
            colorRange(): string[];
            /**
             * Sets the color range.
             *
             * @param {string|string[]} [colorRange]. If provided and if colorRange is one of
             * (reds/blues/posneg), uses the built-in color groups. If colorRange is an
             * array of strings with at least 2 values (e.g. ["#FF00FF", "red",
             * "dodgerblue"], the resulting scale will interpolate between the color
             * values across the domain.
             * @returns {InterpolatedColor} The calling InterpolatedColor.
             */
            colorRange(colorRange: string | string[]): InterpolatedColor;
            /**
             * Gets the internal scale type.
             *
             * @returns {string} The current scale type.
             */
            scaleType(): string;
            /**
             * Sets the internal scale type.
             *
             * @param {string} scaleType If provided, the type of d3 scale to use internally.  (linear/log/sqrt/pow).
             * @returns {InterpolatedColor} The calling InterpolatedColor.
             */
            scaleType(scaleType: string): InterpolatedColor;
            autoDomain(): InterpolatedColor;
        }
    }
}


declare module Plottable {
    module Scales {
        module TickGenerators {
            interface TickGenerator<D> {
                (scale: Plottable.QuantitativeScale<D>): D[];
            }
            /**
             * Creates a tick generator using the specified interval.
             *
             * Generates ticks at multiples of the interval while also including the domain boundaries.
             *
             * @param {number} interval The interval between two ticks (not including the end ticks).
             *
             * @returns {TickGenerator} A tick generator using the specified interval.
             */
            function intervalTickGenerator(interval: number): TickGenerator<number>;
            /**
             * Creates a tick generator that will filter for only the integers in defaultTicks and return them.
             *
             * Will also include the end ticks.
             *
             * @returns {TickGenerator} A tick generator returning only integer ticks.
             */
            function integerTickGenerator(): TickGenerator<number>;
        }
    }
}


declare module Plottable {
    module Drawers {
        /**
         * A step for the drawer to draw.
         *
         * Specifies how AttributeToProjector needs to be animated.
         */
        type DrawStep = {
            attrToProjector: AttributeToProjector;
            animator: Animators.PlotAnimator;
        };
        type AppliedDrawStep = {
            attrToProjector: AttributeToAppliedProjector;
            animator: Animators.PlotAnimator;
        };
        class AbstractDrawer {
            protected _className: string;
            key: string;
            protected _attrToProjector: AttributeToAppliedProjector;
            /**
             * Sets the class, which needs to be applied to bound elements.
             *
             * @param{string} className The class name to be applied.
             */
            setClass(className: string): AbstractDrawer;
            /**
             * Constructs a Drawer
             *
             * @constructor
             * @param{string} key The key associated with this Drawer
             */
            constructor(key: string);
            setup(area: D3.Selection): void;
            /**
             * Removes the Drawer and its renderArea
             */
            remove(): void;
            /**
             * Enter new data to render area and creates binding
             *
             * @param{any[]} data The data to be drawn
             */
            protected _enterData(data: any[]): void;
            /**
             * Draws data using one step
             *
             * @param{AppliedDrawStep} step The step, how data should be drawn.
             */
            protected _drawStep(step: AppliedDrawStep): void;
            protected _numberOfAnimationIterations(data: any[]): number;
            protected _prepareDrawSteps(drawSteps: AppliedDrawStep[]): void;
            protected _prepareData(data: any[], drawSteps: AppliedDrawStep[]): any[];
            /**
             * Draws the data into the renderArea using the spefic steps and metadata
             *
             * @param{any[]} data The data to be drawn
             * @param{DrawStep[]} drawSteps The list of steps, which needs to be drawn
             * @param{any} userMetadata The metadata provided by user
             * @param{any} plotMetadata The metadata provided by plot
             */
            draw(data: any[], drawSteps: DrawStep[], userMetadata: any, plotMetadata: Plots.PlotMetadata): number;
            /**
             * Retrieves the renderArea selection for the drawer
             *
             * @returns {D3.Selection} the renderArea selection
             */
            _getRenderArea(): D3.Selection;
            _getSelector(): string;
            _getPixelPoint(datum: any, index: number): Point;
            _getSelection(index: number): D3.Selection;
        }
    }
}


declare module Plottable {
    module Drawers {
        class Line extends AbstractDrawer {
            static LINE_CLASS: string;
            protected _enterData(data: any[]): void;
            setup(area: D3.Selection): void;
            protected _numberOfAnimationIterations(data: any[]): number;
            protected _drawStep(step: AppliedDrawStep): void;
            _getSelector(): string;
            _getPixelPoint(datum: any, index: number): Point;
            _getSelection(index: number): D3.Selection;
        }
    }
}


declare module Plottable {
    module Drawers {
        class Area extends Line {
            static AREA_CLASS: string;
            protected _enterData(data: any[]): void;
            /**
             * Sets the value determining if line should be drawn.
             *
             * @param{boolean} draw The value determing if line should be drawn.
             */
            drawLine(draw: boolean): Area;
            setup(area: D3.Selection): void;
            protected _drawStep(step: AppliedDrawStep): void;
            _getSelector(): string;
        }
    }
}


declare module Plottable {
    module Drawers {
        class Element extends AbstractDrawer {
            protected _svgElement: string;
            /**
             * Sets the svg element, which needs to be bind to data
             *
             * @param{string} tag The svg element to be bind
             */
            svgElement(tag: string): Element;
            protected _drawStep(step: AppliedDrawStep): void;
            protected _enterData(data: any[]): void;
            protected _prepareDrawSteps(drawSteps: AppliedDrawStep[]): void;
            protected _prepareData(data: any[], drawSteps: AppliedDrawStep[]): any[];
            _getSelector(): string;
        }
    }
}


declare module Plottable {
    module Drawers {
        class Rect extends Element {
            constructor(key: string, isVertical: boolean);
            setup(area: D3.Selection): void;
            removeLabels(): void;
            _getIfLabelsTooWide(): boolean;
            drawText(data: any[], attrToProjector: AttributeToProjector, userMetadata: any, plotMetadata: Plots.PlotMetadata): void;
            _getPixelPoint(datum: any, index: number): Point;
            draw(data: any[], drawSteps: DrawStep[], userMetadata: any, plotMetadata: Plots.PlotMetadata): number;
        }
    }
}


declare module Plottable {
    module Drawers {
        class Arc extends Element {
            constructor(key: string);
            _drawStep(step: AppliedDrawStep): void;
            draw(data: any[], drawSteps: DrawStep[], userMetadata: any, plotMetadata: Plots.PlotMetadata): number;
            _getPixelPoint(datum: any, index: number): Point;
        }
    }
}


declare module Plottable {
    module Drawers {
        class Symbol extends Element {
            constructor(key: string);
            protected _drawStep(step: AppliedDrawStep): void;
            _getPixelPoint(datum: any, index: number): Point;
        }
    }
}


declare module Plottable {
    module Components {
        class Alignment {
            static TOP: string;
            static BOTTOM: string;
            static LEFT: string;
            static RIGHT: string;
            static CENTER: string;
        }
    }
    class Component extends Core.PlottableObject {
        protected _element: D3.Selection;
        protected _content: D3.Selection;
        protected _boundingBox: D3.Selection;
        clipPathEnabled: boolean;
        protected _fixedHeightFlag: boolean;
        protected _fixedWidthFlag: boolean;
        protected _isSetup: boolean;
        protected _isAnchored: boolean;
        /**
         * Attaches the Component as a child of a given D3 Selection.
         *
         * @param {D3.Selection} selection The Selection containing the Element to anchor under.
         * @returns {Component} The calling Component.
         */
        anchor(selection: D3.Selection): Component;
        /**
         * Creates additional elements as necessary for the Component to function.
         * Called during _anchor() if the Component's element has not been created yet.
         * Override in subclasses to provide additional functionality.
         */
        protected _setup(): void;
        requestedSpace(availableWidth: number, availableHeight: number): _SpaceRequest;
        /**
         * Computes the size, position, and alignment from the specified values.
         * If no parameters are supplied and the Component is a root node,
         * they are inferred from the size of the Component's element.
         *
         * @param {Point} origin Origin of the space offered to the Component.
         * @param {number} availableWidth
         * @param {number} availableHeight
         * @returns {Component} The calling Component.
         */
        computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): Component;
        protected _getSize(availableWidth: number, availableHeight: number): {
            width: number;
            height: number;
        };
        render(): Component;
        _doRender(): void;
        /**
         * Causes the Component to recompute layout and redraw.
         *
         * This function should be called when CSS changes could influence the size
         * of the components, e.g. changing the font size.
         *
         * @returns {Component} The calling Component.
         */
        redraw(): Component;
        /**
         * Renders the Component into a given DOM element. The element must be as <svg>.
         *
         * @param {String|D3.Selection} element A D3 selection or a selector for getting the element to render into.
         * @returns {Component} The calling component.
         */
        renderTo(element: String | D3.Selection): Component;
        /**
         * Sets the x alignment of the Component. This will be used if the
         * Component is given more space than it needs.
         *
         * For example, you may want to make a Legend postition itself it the top
         * right, so you would call `legend.xAlign("right")` and
         * `legend.yAlign("top")`.
         *
         * @param {string} alignment The x alignment of the Component (one of ["left", "center", "right"]).
         * @returns {Component} The calling Component.
         */
        xAlign(alignment: string): Component;
        /**
         * Sets the y alignment of the Component. This will be used if the
         * Component is given more space than it needs.
         *
         * For example, you may want to make a Legend postition itself it the top
         * right, so you would call `legend.xAlign("right")` and
         * `legend.yAlign("top")`.
         *
         * @param {string} alignment The x alignment of the Component (one of ["top", "center", "bottom"]).
         * @returns {Component} The calling Component.
         */
        yAlign(alignment: string): Component;
        /**
         * Sets the x offset of the Component. This will be used if the Component
         * is given more space than it needs.
         *
         * @param {number} offset The desired x offset, in pixels, from the left
         * side of the container.
         * @returns {Component} The calling Component.
         */
        xOffset(offset: number): Component;
        /**
         * Sets the y offset of the Component. This will be used if the Component
         * is given more space than it needs.
         *
         * @param {number} offset The desired y offset, in pixels, from the top
         * side of the container.
         * @returns {Component} The calling Component.
         */
        yOffset(offset: number): Component;
        /**
         * Attaches an Interaction to the Component, so that the Interaction will listen for events on the Component.
         *
         * @param {Interaction} interaction The Interaction to attach to the Component.
         * @returns {Component} The calling Component.
         */
        registerInteraction(interaction: Interaction): Component;
        /**
         * Checks if the Component has a given CSS class.
         *
         * @param {string} cssClass The CSS class to check for.
         * @returns {boolean} Whether the Component has the given CSS class.
         */
        classed(cssClass: string): boolean;
        /**
         * Adds/removes a given CSS class to/from the Component.
         *
         * @param {string} cssClass The CSS class to add or remove.
         * @param {boolean} addClass If true, adds the provided CSS class; otherwise, removes it.
         * @returns {Component} The calling Component.
         */
        classed(cssClass: string, addClass: boolean): Component;
        /**
         * Checks if the Component has a fixed width or false if it grows to fill available space.
         * Returns false by default on the base Component class.
         *
         * @returns {boolean} Whether the component has a fixed width.
         */
        _isFixedWidth(): boolean;
        /**
         * Checks if the Component has a fixed height or false if it grows to fill available space.
         * Returns false by default on the base Component class.
         *
         * @returns {boolean} Whether the component has a fixed height.
         */
        _isFixedHeight(): boolean;
        _merge(c: Component, below: boolean): Components.Group;
        /**
         * Merges this Component above another Component, returning a
         * ComponentGroup. This is used to layer Components on top of each other.
         *
         * There are four cases:
         * Component + Component: Returns a ComponentGroup with the first component after the second component.
         * ComponentGroup + Component: Returns the ComponentGroup with the Component prepended.
         * Component + ComponentGroup: Returns the ComponentGroup with the Component appended.
         * ComponentGroup + ComponentGroup: Returns a new ComponentGroup with the first group after the second group.
         *
         * @param {Component} c The component to merge in.
         * @returns {ComponentGroup} The relevant ComponentGroup out of the above four cases.
         */
        above(c: Component): Components.Group;
        /**
         * Merges this Component below another Component, returning a
         * ComponentGroup. This is used to layer Components on top of each other.
         *
         * There are four cases:
         * Component + Component: Returns a ComponentGroup with the first component before the second component.
         * ComponentGroup + Component: Returns the ComponentGroup with the Component appended.
         * Component + ComponentGroup: Returns the ComponentGroup with the Component prepended.
         * ComponentGroup + ComponentGroup: Returns a new ComponentGroup with the first group before the second group.
         *
         * @param {Component} c The component to merge in.
         * @returns {ComponentGroup} The relevant ComponentGroup out of the above four cases.
         */
        below(c: Component): Components.Group;
        /**
         * Detaches a Component from the DOM. The component can be reused.
         *
         * This should only be used if you plan on reusing the calling
         * Components. Otherwise, use remove().
         *
         * @returns The calling Component.
         */
        detach(): Component;
        _parent(): ComponentContainer;
        _parent(parentElement: ComponentContainer): any;
        /**
         * Removes a Component from the DOM and disconnects it from everything it's
         * listening to (effectively destroying it).
         */
        destroy(): void;
        /**
         * Return the width of the component
         *
         * @return {number} width of the component
         */
        width(): number;
        /**
         * Return the height of the component
         *
         * @return {number} height of the component
         */
        height(): number;
        /**
         * Gets the origin of the Component relative to its parent.
         *
         * @return {Point} The x-y position of the Component relative to its parent.
         */
        origin(): Point;
        /**
         * Gets the origin of the Component relative to the root <svg>.
         *
         * @return {Point} The x-y position of the Component relative to the root <svg>
         */
        originToSVG(): Point;
        /**
         * Returns the foreground selection for the Component
         * (A selection covering the front of the Component)
         *
         * Will return undefined if the Component has not been anchored.
         *
         * @return {D3.Selection} foreground selection for the Component
         */
        foreground(): D3.Selection;
        /**
         * Returns the content selection for the Component
         * (A selection containing the visual elements of the Component)
         *
         * Will return undefined if the Component has not been anchored.
         *
         * @return {D3.Selection} content selection for the Component
         */
        content(): D3.Selection;
        /**
         * Returns the background selection for the Component
         * (A selection appearing behind of the Component)
         *
         * Will return undefined if the Component has not been anchored.
         *
         * @return {D3.Selection} background selection for the Component
         */
        background(): D3.Selection;
    }
}


declare module Plottable {
    class ComponentContainer extends Component {
        anchor(selection: D3.Selection): ComponentContainer;
        render(): ComponentContainer;
        /**
         * Removes the specified Component from the ComponentContainer
         *
         * @param c Component the Component to remove.
         */
        remove(c: Component): void;
        /**
         * Adds the specified Component to the ComponentContainer.
         *
         * @param c Component the component to add
         * @param prepend boolean whether the component should be prepended to the componentContainer or not.
         */
        add(c: Component, prepend?: boolean): boolean;
        /**
         * Returns a list of components in the ComponentContainer.
         *
         * @returns {Component[]} the contained Components
         */
        components(): Component[];
        /**
         * Returns true iff the ComponentContainer is empty.
         *
         * @returns {boolean} Whether the calling ComponentContainer is empty.
         */
        empty(): boolean;
        /**
         * Detaches all components contained in the ComponentContainer, and
         * empties the ComponentContainer.
         *
         * @returns {ComponentContainer} The calling ComponentContainer
         */
        detachAll(): ComponentContainer;
        destroy(): void;
    }
}


declare module Plottable {
    module Components {
        class Group extends ComponentContainer {
            /**
             * Constructs a Component.Group.
             *
             * A Component.Group is a set of Components that will be rendered on top of
             * each other. When you call Component.above(Component) or Component.below(Component),
             * it creates and returns a Component.Group.
             *
             * Note that the order of the components will determine placement on the z-axis,
             * with the previous items rendered below the later items.
             *
             * @constructor
             * @param {Component[]} components The Components in the resultant Component.Group (default = []).
             */
            constructor(components?: Component[]);
            requestedSpace(offeredWidth: number, offeredHeight: number): _SpaceRequest;
            _merge(c: Component, below: boolean): Group;
            computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): Group;
            protected _getSize(availableWidth: number, availableHeight: number): {
                width: number;
                height: number;
            };
            _isFixedWidth(): boolean;
            _isFixedHeight(): boolean;
        }
    }
}


declare module Plottable {
    class Axis extends Component {
        /**
         * The css class applied to each end tick mark (the line on the end tick).
         */
        static END_TICK_MARK_CLASS: string;
        /**
         * The css class applied to each tick mark (the line on the tick).
         */
        static TICK_MARK_CLASS: string;
        /**
         * The css class applied to each tick label (the text associated with the tick).
         */
        static TICK_LABEL_CLASS: string;
        protected _tickMarkContainer: D3.Selection;
        protected _tickLabelContainer: D3.Selection;
        protected _baseline: D3.Selection;
        protected _scale: Scale<any, number>;
        protected _computedWidth: number;
        protected _computedHeight: number;
        /**
         * Constructs an axis. An axis is a wrapper around a scale for rendering.
         *
         * @constructor
         * @param {Scale} scale The scale for this axis to render.
         * @param {string} orientation One of ["top", "left", "bottom", "right"];
         * on which side the axis will appear. On most axes, this is either "left"
         * or "bottom".
         * @param {Formatter} Data is passed through this formatter before being
         * displayed.
         */
        constructor(scale: Scale<any, number>, orientation: string, formatter?: (d: any) => string);
        destroy(): void;
        protected _isHorizontal(): boolean;
        protected _computeWidth(): number;
        protected _computeHeight(): number;
        requestedSpace(offeredWidth: number, offeredHeight: number): _SpaceRequest;
        _isFixedHeight(): boolean;
        _isFixedWidth(): boolean;
        protected _rescale(): void;
        computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): Axis;
        protected _setup(): void;
        protected _getTickValues(): any[];
        _doRender(): void;
        protected _generateBaselineAttrHash(): {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        };
        protected _generateTickMarkAttrHash(isEndTickMark?: boolean): {
            x1: any;
            y1: any;
            x2: any;
            y2: any;
        };
        redraw(): Component;
        protected _setDefaultAlignment(): void;
        /**
         * Gets the current formatter on the axis. Data is passed through the
         * formatter before being displayed.
         *
         * @returns {Formatter} The calling Axis, or the current
         * Formatter.
         */
        formatter(): Formatter;
        /**
         * Sets the current formatter on the axis. Data is passed through the
         * formatter before being displayed.
         *
         * @param {Formatter} formatter If provided, data will be passed though `formatter(data)`.
         * @returns {Axis} The calling Axis.
         */
        formatter(formatter: Formatter): Axis;
        /**
         * Gets the current tick mark length.
         *
         * @returns {number} the current tick mark length.
         */
        tickLength(): number;
        /**
         * Sets the current tick mark length.
         *
         * @param {number} length If provided, length of each tick.
         * @returns {Axis} The calling Axis.
         */
        tickLength(length: number): Axis;
        /**
         * Gets the current end tick mark length.
         *
         * @returns {number} The current end tick mark length.
         */
        endTickLength(): number;
        /**
         * Sets the end tick mark length.
         *
         * @param {number} length If provided, the length of the end ticks.
         * @returns {BaseAxis} The calling Axis.
         */
        endTickLength(length: number): Axis;
        protected _maxLabelTickLength(): number;
        /**
         * Gets the padding between each tick mark and its associated label.
         *
         * @returns {number} the current padding.
         * length.
         */
        tickLabelPadding(): number;
        /**
         * Sets the padding between each tick mark and its associated label.
         *
         * @param {number} padding If provided, the desired padding.
         * @returns {Axis} The calling Axis.
         */
        tickLabelPadding(padding: number): Axis;
        /**
         * Gets the size of the gutter (the extra space between the tick
         * labels and the outer edge of the axis).
         *
         * @returns {number} the current gutter.
         * length.
         */
        gutter(): number;
        /**
         * Sets the size of the gutter (the extra space between the tick
         * labels and the outer edge of the axis).
         *
         * @param {number} size If provided, the desired gutter.
         * @returns {Axis} The calling Axis.
         */
        gutter(size: number): Axis;
        /**
         * Gets the orientation of the Axis.
         *
         * @returns {number} the current orientation.
         */
        orient(): string;
        /**
         * Sets the orientation of the Axis.
         *
         * @param {number} newOrientation If provided, the desired orientation
         * (top/bottom/left/right).
         * @returns {Axis} The calling Axis.
         */
        orient(newOrientation: string): Axis;
        /**
         * Gets whether the Axis is currently set to show the first and last
         * tick labels.
         *
         * @returns {boolean} whether or not the last
         * tick labels are showing.
         */
        showEndTickLabels(): boolean;
        /**
         * Sets whether the Axis is currently set to show the first and last tick
         * labels.
         *
         * @param {boolean} show Whether or not to show the first and last
         * labels.
         * @returns {Axis} The calling Axis.
         */
        showEndTickLabels(show: boolean): Axis;
    }
}


declare module Plottable {
    module Axes {
        /**
         * Defines a configuration for a time axis tier.
         * For details on how ticks are generated see: https://github.com/mbostock/d3/wiki/Time-Scales#ticks
         * interval - A time unit associated with this configuration (seconds, minutes, hours, etc).
         * step - number of intervals between each tick.
         * formatter - formatter used to format tick labels.
         */
        type TimeAxisTierConfiguration = {
            interval: D3.Time.Interval;
            step: number;
            formatter: Formatter;
        };
        /**
         * An array of linked TimeAxisTierConfigurations.
         * Each configuration will be shown on a different tier.
         * Currently, up to two tiers are supported.
         */
        type TimeAxisConfiguration = TimeAxisTierConfiguration[];
        class Time extends Axis {
            /**
             * The css class applied to each time axis tier
             */
            static TIME_AXIS_TIER_CLASS: string;
            /**
             * Constructs a TimeAxis.
             *
             * A TimeAxis is used for rendering a TimeScale.
             *
             * @constructor
             * @param {TimeScale} scale The scale to base the Axis on.
             * @param {string} orientation The orientation of the Axis (top/bottom)
             */
            constructor(scale: Scales.Time, orientation: string);
            tierLabelPositions(): string[];
            tierLabelPositions(newPositions: string[]): Time;
            /**
             * Gets the possible Axis configurations.
             *
             * @returns {TimeAxisConfiguration[]} The possible tier configurations.
             */
            axisConfigurations(): TimeAxisConfiguration[];
            /**
             * Sets possible Axis configurations.
             * The axis will choose the most precise configuration that will display in
             * its current width.
             *
             * @param {TimeAxisConfiguration[]} configurations Possible axis configurations.
             * @returns {Axis.Time} The calling Axis.Time.
             */
            axisConfigurations(configurations: TimeAxisConfiguration[]): Time;
            orient(): string;
            orient(orientation: string): Time;
            protected _computeHeight(): number;
            protected _getSize(availableWidth: number, availableHeight: number): {
                width: number;
                height: number;
            };
            protected _setup(): void;
            protected _getTickValues(): any[];
            _doRender(): Time;
        }
    }
}


declare module Plottable {
    module Axes {
        class Numeric extends Axis {
            /**
             * Constructs a NumericAxis.
             *
             * Just as an CategoryAxis is for rendering an OrdinalScale, a NumericAxis
             * is for rendering a QuantitativeScaleScale.
             *
             * @constructor
             * @param {QuantitativeScaleScale} scale The QuantitativeScaleScale to base the axis on.
             * @param {string} orientation The orientation of the QuantitativeScaleScale (top/bottom/left/right)
             * @param {Formatter} formatter A function to format tick labels (default Formatters.general()).
             */
            constructor(scale: QuantitativeScale<number>, orientation: string, formatter?: (d: any) => string);
            protected _setup(): void;
            protected _computeWidth(): number;
            protected _computeHeight(): number;
            protected _getTickValues(): any[];
            protected _rescale(): void;
            _doRender(): void;
            /**
             * Gets the tick label position relative to the tick marks.
             *
             * @returns {string} The current tick label position.
             */
            tickLabelPosition(): string;
            /**
             * Sets the tick label position relative to the tick marks.
             *
             * @param {string} position If provided, the relative position of the tick label.
             *                          [top/center/bottom] for a vertical NumericAxis,
             *                          [left/center/right] for a horizontal NumericAxis.
             *                          Defaults to center.
             * @returns {Numeric} The calling Axis.Numeric.
             */
            tickLabelPosition(position: string): Numeric;
            /**
             * Gets whether or not the tick labels at the end of the graph are
             * displayed when partially cut off.
             *
             * @param {string} orientation Where on the scale to change tick labels.
             *                 On a "top" or "bottom" axis, this can be "left" or
             *                 "right". On a "left" or "right" axis, this can be "top"
             *                 or "bottom".
             * @returns {boolean} The current setting.
             */
            showEndTickLabel(orientation: string): boolean;
            /**
             * Sets whether or not the tick labels at the end of the graph are
             * displayed when partially cut off.
             *
             * @param {string} orientation If provided, where on the scale to change tick labels.
             *                 On a "top" or "bottom" axis, this can be "left" or
             *                 "right". On a "left" or "right" axis, this can be "top"
             *                 or "bottom".
             * @param {boolean} show Whether or not the given tick should be
             * displayed.
             * @returns {Numeric} The calling NumericAxis.
             */
            showEndTickLabel(orientation: string, show: boolean): Numeric;
        }
    }
}


declare module Plottable {
    module Axes {
        class Category extends Axis {
            /**
             * Constructs a CategoryAxis.
             *
             * A CategoryAxis takes a CategoryScale and includes word-wrapping
             * algorithms and advanced layout logic to try to display the scale as
             * efficiently as possible.
             *
             * @constructor
             * @param {CategoryScale} scale The scale to base the Axis on.
             * @param {string} orientation The orientation of the Axis (top/bottom/left/right) (default = "bottom").
             * @param {Formatter} formatter The Formatter for the Axis (default Formatters.identity())
             */
            constructor(scale: Scales.Category, orientation?: string, formatter?: (d: any) => string);
            protected _setup(): void;
            protected _rescale(): Component;
            requestedSpace(offeredWidth: number, offeredHeight: number): _SpaceRequest;
            protected _getTickValues(): string[];
            /**
             * Sets the angle for the tick labels. Right now vertical-left (-90), horizontal (0), and vertical-right (90) are the only options.
             * @param {number} angle The angle for the ticks
             * @returns {Category} The calling Category Axis.
             *
             * Warning - this is not currently well supported and is likely to behave badly unless all the tick labels are short.
             * See tracking at https://github.com/palantir/plottable/issues/504
             */
            tickLabelAngle(angle: number): Category;
            /**
             * Gets the tick label angle
             * @returns {number} the tick label angle
             */
            tickLabelAngle(): number;
            _doRender(): Category;
            computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): Axis;
        }
    }
}


declare module Plottable {
    module Components {
        class Label extends Component {
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
            constructor(displayText?: string, orientation?: string);
            /**
             * Sets the horizontal side the label will go to given the label is given more space that it needs
             *
             * @param {string} alignment The new setting, one of `["left", "center",
             * "right"]`. Defaults to `"center"`.
             * @returns {Label} The calling Label.
             */
            xAlign(alignment: string): Label;
            /**
             * Sets the vertical side the label will go to given the label is given more space that it needs
             *
             * @param {string} alignment The new setting, one of `["top", "center",
             * "bottom"]`. Defaults to `"center"`.
             * @returns {Label} The calling Label.
             */
            yAlign(alignment: string): Label;
            requestedSpace(offeredWidth: number, offeredHeight: number): _SpaceRequest;
            protected _setup(): void;
            /**
             * Gets the current text on the Label.
             *
             * @returns {string} the text on the label.
             */
            text(): string;
            /**
             * Sets the current text on the Label.
             *
             * @param {string} displayText If provided, the new text for the Label.
             * @returns {Label} The calling Label.
             */
            text(displayText: string): Label;
            /**
             * Gets the orientation of the Label.
             *
             * @returns {string} the current orientation.
             */
            orient(): string;
            /**
             * Sets the orientation of the Label.
             *
             * @param {string} newOrientation If provided, the desired orientation
             * (horizontal/left/right).
             * @returns {Label} The calling Label.
             */
            orient(newOrientation: string): Label;
            /**
             * Gets the amount of padding in pixels around the Label.
             *
             * @returns {number} the current padding amount.
             */
            padding(): number;
            /**
             * Sets the amount of padding in pixels around the Label.
             *
             * @param {number} padAmount The desired padding amount in pixel values
             * @returns {Label} The calling Label.
             */
            padding(padAmount: number): Label;
            _doRender(): void;
        }
        class TitleLabel extends Label {
            /**
             * Creates a TitleLabel, a type of label made for rendering titles.
             *
             * @constructor
             */
            constructor(text?: string, orientation?: string);
        }
        class AxisLabel extends Label {
            /**
             * Creates a AxisLabel, a type of label made for rendering axis labels.
             *
             * @constructor
             */
            constructor(text?: string, orientation?: string);
        }
    }
}


declare module Plottable {
    module Components {
        class Legend extends Component {
            /**
             * The css class applied to each legend row
             */
            static LEGEND_ROW_CLASS: string;
            /**
             * The css class applied to each legend entry
             */
            static LEGEND_ENTRY_CLASS: string;
            /**
             * The css class applied to each legend symbol
             */
            static LEGEND_SYMBOL_CLASS: string;
            /**
             * Creates a Legend.
             *
             * The legend consists of a series of legend entries, each with a color and label taken from the `colorScale`.
             * The entries will be displayed in the order of the `colorScale` domain.
             *
             * @constructor
             * @param {Scale.Color} colorScale
             */
            constructor(colorScale: Scales.Color);
            protected _setup(): void;
            /**
             * Gets the current max number of entries in Legend row.
             * @returns {number} The current max number of entries in row.
             */
            maxEntriesPerRow(): number;
            /**
             * Sets a new max number of entries in Legend row.
             *
             * @param {number} numEntries If provided, the new max number of entries in row.
             * @returns {Legend} The calling Legend.
             */
            maxEntriesPerRow(numEntries: number): Legend;
            /**
             * Gets the current sort function for Legend's entries.
             * @returns {(a: string, b: string) => number} The current sort function.
             */
            sortFunction(): (a: string, b: string) => number;
            /**
             * Sets a new sort function for Legend's entires.
             *
             * @param {(a: string, b: string) => number} newFn If provided, the new compare function.
             * @returns {Legend} The calling Legend.
             */
            sortFunction(newFn: (a: string, b: string) => number): Legend;
            /**
             * Gets the current color scale from the Legend.
             *
             * @returns {ColorScale} The current color scale.
             */
            scale(): Scales.Color;
            /**
             * Assigns a new color scale to the Legend.
             *
             * @param {Scale.Color} scale If provided, the new scale.
             * @returns {Legend} The calling Legend.
             */
            scale(scale: Scales.Color): Legend;
            destroy(): void;
            requestedSpace(offeredWidth: number, offeredHeight: number): _SpaceRequest;
            /**
             * Gets the legend entry under the given pixel position.
             *
             * @param {Point} position The pixel position.
             * @returns {D3.Selection} The selected entry, or null selection if no entry was selected.
             */
            getEntry(position: Point): D3.Selection;
            _doRender(): void;
            /**
             * Gets the symbolFactoryAccessor of the legend, which dictates how
             * the symbol in each entry is drawn.
             *
             * @returns {(datum: any, index: number) => symbolFactory} The symbolFactory accessor of the legend
             */
            symbolFactoryAccessor(): (datum: any, index: number) => SymbolFactory;
            /**
             * Sets the symbolFactoryAccessor of the legend
             *
             * @param {(datum: any, index: number) => symbolFactory}  The symbolFactory accessor to set to
             * @returns {Legend} The calling Legend
             */
            symbolFactoryAccessor(symbolFactoryAccessor: (datum: any, index: number) => SymbolFactory): Legend;
        }
    }
}


declare module Plottable {
    module Components {
        class InterpolatedColorLegend extends Component {
            /**
             * The css class applied to the legend labels.
             */
            static LEGEND_LABEL_CLASS: string;
            /**
             * Creates an InterpolatedColorLegend.
             *
             * The InterpolatedColorLegend consists of a sequence of swatches, showing the
             * associated Scale.InterpolatedColor sampled at various points. Two labels
             * show the maximum and minimum values of the Scale.InterpolatedColor.
             *
             * @constructor
             * @param {Scale.InterpolatedColor} interpolatedColorScale
             * @param {string} orientation (horizontal/left/right).
             * @param {Formatter} The labels are formatted using this function.
             */
            constructor(interpolatedColorScale: Scales.InterpolatedColor, orientation?: string, formatter?: (d: any) => string);
            destroy(): void;
            /**
             * Gets the current formatter on the InterpolatedColorLegend.
             *
             * @returns {Formatter} The current Formatter.
             */
            formatter(): Formatter;
            /**
             * Sets the current formatter on the InterpolatedColorLegend.
             *
             * @param {Formatter} formatter If provided, data will be passed though `formatter(data)`.
             * @returns {InterpolatedColorLegend} The calling InterpolatedColorLegend.
             */
            formatter(formatter: Formatter): InterpolatedColorLegend;
            /**
             * Gets the orientation of the InterpolatedColorLegend.
             *
             * @returns {string} The current orientation.
             */
            orient(): string;
            /**
             * Sets the orientation of the InterpolatedColorLegend.
             *
             * @param {string} newOrientation The desired orientation (horizontal/left/right).
             *
             * @returns {InterpolatedColorLegend} The calling InterpolatedColorLegend.
             */
            orient(newOrientation: string): InterpolatedColorLegend;
            protected _setup(): void;
            requestedSpace(offeredWidth: number, offeredHeight: number): _SpaceRequest;
            _doRender(): void;
        }
    }
}


declare module Plottable {
    module Components {
        class Gridlines extends Component {
            /**
             * Creates a set of Gridlines.
             * @constructor
             *
             * @param {QuantitativeScaleScale} xScale The scale to base the x gridlines on. Pass null if no gridlines are desired.
             * @param {QuantitativeScaleScale} yScale The scale to base the y gridlines on. Pass null if no gridlines are desired.
             */
            constructor(xScale: QuantitativeScale<any>, yScale: QuantitativeScale<any>);
            destroy(): Gridlines;
            protected _setup(): void;
            _doRender(): void;
        }
    }
}


declare module Plottable {
    module Components {
        type _IterateLayoutResult = {
            colProportionalSpace: number[];
            rowProportionalSpace: number[];
            guaranteedWidths: number[];
            guaranteedHeights: number[];
            wantsWidth: boolean;
            wantsHeight: boolean;
        };
        class Table extends ComponentContainer {
            /**
             * Constructs a Table.
             *
             * A Table is used to combine multiple Components in the form of a grid. A
             * common case is combining a y-axis, x-axis, and the plotted data via
             * ```typescript
             * new Table([[yAxis, plot],
             *            [null,  xAxis]]);
             * ```
             *
             * @constructor
             * @param {Component[][]} [rows] A 2-D array of the Components to place in the table.
             * null can be used if a cell is empty. (default = [])
             */
            constructor(rows?: Component[][]);
            /**
             * Adds a Component in the specified row and column position.
             *
             * For example, instead of calling `new Table([[a, b], [null, c]])`, you
             * could call
             * ```typescript
             * var table = new Table();
             * table.addComponent(a, 0, 0);
             * table.addComponent(b, 0, 1);
             * table.addComponent(c, 1, 1);
             * ```
             *
             * @param {Component} component The Component to be added.
             * @param {number} row The row in which to add the Component.
             * @param {number} col The column in which to add the Component.
             * @returns {Table} The calling Table.
             */
            addComponent(component: Component, row: number, col: number): Table;
            /**
             * Removes a Component.
             *
             * @param {Component} component The Component to be removed.
             */
            removeComponent(component: Component): void;
            requestedSpace(offeredWidth: number, offeredHeight: number): _SpaceRequest;
            computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): Table;
            /**
             * Sets the row and column padding on the Table.
             *
             * @param {number} rowPadding The padding above and below each row, in pixels.
             * @param {number} colPadding the padding to the left and right of each column, in pixels.
             * @returns {Table} The calling Table.
             */
            padding(rowPadding: number, colPadding: number): Table;
            /**
             * Sets the layout weight of a particular row.
             * Space is allocated to rows based on their weight. Rows with higher weights receive proportionally more space.
             *
             * A common case would be to have one row take up 2/3rds of the space,
             * and the other row take up 1/3rd.
             *
             * Example:
             *
             * ```JavaScript
             * plot = new Plottable.Component.Table([
             *  [row1],
             *  [row2]
             * ]);
             *
             * // assign twice as much space to the first row
             * plot
             *  .rowWeight(0, 2)
             *  .rowWeight(1, 1)
             * ```
             *
             * @param {number} index The index of the row.
             * @param {number} weight The weight to be set on the row.
             * @returns {Table} The calling Table.
             */
            rowWeight(index: number, weight: number): Table;
            /**
             * Sets the layout weight of a particular column.
             * Space is allocated to columns based on their weight. Columns with higher weights receive proportionally more space.
             *
             * Please see `rowWeight` docs for an example.
             *
             * @param {number} index The index of the column.
             * @param {number} weight The weight to be set on the column.
             * @returns {Table} The calling Table.
             */
            colWeight(index: number, weight: number): Table;
            _isFixedWidth(): boolean;
            _isFixedHeight(): boolean;
        }
    }
}


declare module Plottable {
    module Components {
        class SelectionBoxLayer extends Component {
            protected _box: D3.Selection;
            constructor();
            protected _setup(): void;
            protected _getSize(availableWidth: number, availableHeight: number): {
                width: number;
                height: number;
            };
            /**
             * Gets the bounds of the box.
             *
             * @return {Bounds} The current bounds of the box.
             */
            bounds(): Bounds;
            /**
             * Sets the bounds of the box, and draws the box.
             *
             * @param {Bounds} newBounds The desired bounds of the box.
             * @return {SelectionBoxLayer} The calling SelectionBoxLayer.
             */
            bounds(newBounds: Bounds): SelectionBoxLayer;
            protected _setBounds(newBounds: Bounds): void;
            _doRender(): void;
            /**
             * Gets whether the box is being shown.
             *
             * @return {boolean} Whether the box is showing.
             */
            boxVisible(): boolean;
            /**
             * Shows or hides the selection box.
             *
             * @param {boolean} show Whether or not to show the box.
             * @return {SelectionBoxLayer} The calling SelectionBoxLayer.
             */
            boxVisible(show: boolean): SelectionBoxLayer;
        }
    }
}


declare module Plottable {
    module Plots {
        /**
         * A key that is also coupled with a dataset, a drawer and a metadata in Plot.
         */
        type PlotDatasetKey = {
            dataset: Dataset;
            drawer: Drawers.AbstractDrawer;
            plotMetadata: PlotMetadata;
            key: string;
        };
        interface PlotMetadata {
            datasetKey: string;
        }
        type PlotData = {
            data: any[];
            pixelPoints: Point[];
            selection: D3.Selection;
        };
    }
    class Plot extends Component {
        protected _dataChanged: boolean;
        protected _key2PlotDatasetKey: D3.Map<Plots.PlotDatasetKey>;
        protected _datasetKeysInOrder: string[];
        protected _renderArea: D3.Selection;
        protected _projections: {
            [attrToSet: string]: _Projection;
        };
        protected _attrToExtents: D3.Map<any[]>;
        protected _animate: boolean;
        protected _animateOnNextRender: boolean;
        /**
         * Constructs a Plot.
         *
         * Plots render data. Common example include Plot.Scatter, Plot.Bar, and Plot.Line.
         *
         * A bare Plot has a DataSource and any number of projectors, which take
         * data and "project" it onto the Plot, such as "x", "y", "fill", "r".
         *
         * @constructor
         * @param {any[]|Dataset} [dataset] If provided, the data or Dataset to be associated with this Plot.
         */
        constructor();
        anchor(selection: D3.Selection): Plot;
        protected _setup(): void;
        destroy(): void;
        /**
         * Adds a dataset to this plot. Identify this dataset with a key.
         *
         * A key is automatically generated if not supplied.
         *
         * @param {string} [key] The key of the dataset.
         * @param {Dataset | any[]} dataset dataset to add.
         * @returns {Plot} The calling Plot.
         */
        addDataset(dataset: Dataset | any[]): Plot;
        addDataset(key: string, dataset: Dataset | any[]): Plot;
        protected _getDrawer(key: string): Drawers.AbstractDrawer;
        protected _getAnimator(key: string): Animators.PlotAnimator;
        protected _onDatasetUpdate(): void;
        /**
         * Sets an attribute of every data point.
         *
         * Here's a common use case:
         * ```typescript
         * plot.attr("x", function(d) { return d.foo; }, xScale);
         * ```
         * This will set the x accessor of each datum `d` to be `d.foo`,
         * scaled in accordance with `xScale`
         *
         * @param {string} attrToSet The attribute to set across each data
         * point. Popular examples include "x", "y".
         *
         * @param {Function|string|any} accessor Function to apply to each element
         * of the dataSource. If a Function, use `accessor(d, i)`. If a string,
         * `d[accessor]` is used. If anything else, use `accessor` as a constant
         * across all data points.
         *
         * @param {Scale.Scale} scale If provided, the result of the accessor
         * is passed through the scale, such as `scale.scale(accessor(d, i))`.
         *
         * @returns {Plot} The calling Plot.
         */
        attr(attrToSet: string, accessor: any, scale?: Scale<any, any>): Plot;
        /**
         * Identical to plot.attr
         */
        project(attrToSet: string, accessor: any, scale?: Scale<any, any>): Plot;
        protected _generateAttrToProjector(): AttributeToProjector;
        /**
         * Generates a dictionary mapping an attribute to a function that calculate that attribute's value
         * in accordance with the given datasetKey.
         *
         * Note that this will return all of the data attributes, which may not perfectly align to svg attributes
         *
         * @param {datasetKey} the key of the dataset to generate the dictionary for
         * @returns {AttributeToAppliedProjector} A dictionary mapping attributes to functions
         */
        generateProjectors(datasetKey: string): AttributeToAppliedProjector;
        _doRender(): void;
        /**
         * Enables or disables animation.
         *
         * @param {boolean} enabled Whether or not to animate.
         */
        animate(enabled: boolean): Plot;
        detach(): Plot;
        /**
         * Updates the extents associated with each attribute, then autodomains all scales the Plot uses.
         */
        protected _updateExtents(): void;
        /**
         * Override in subclass to add special extents, such as included values
         */
        protected _extentsForAttr(attr: string): any[];
        /**
         * Get the animator associated with the specified Animator key.
         *
         * @return {PlotAnimator} The Animator for the specified key.
         */
        animator(animatorKey: string): Animators.PlotAnimator;
        /**
         * Set the animator associated with the specified Animator key.
         *
         * @param {string} animatorKey The key for the Animator.
         * @param {PlotAnimator} animator An Animator to be assigned to
         * the specified key.
         * @returns {Plot} The calling Plot.
         */
        animator(animatorKey: string, animator: Animators.PlotAnimator): Plot;
        /**
         * Gets the dataset order by key
         *
         * @returns {string[]} A string array of the keys in order
         */
        datasetOrder(): string[];
        /**
         * Sets the dataset order by key
         *
         * @param {string[]} order If provided, a string array which represents the order of the keys.
         * This must be a permutation of existing keys.
         *
         * @returns {Plot} The calling Plot.
         */
        datasetOrder(order: string[]): Plot;
        /**
         * Removes a dataset by the given identifier
         *
         * @param {string | Dataset | any[]} datasetIdentifer The identifier as the key of the Dataset to remove
         * If string is inputted, it is interpreted as the dataset key to remove.
         * If Dataset is inputted, the first Dataset in the plot that is the same will be removed.
         * If any[] is inputted, the first data array in the plot that is the same will be removed.
         * @returns {Plot} The calling Plot.
         */
        removeDataset(datasetIdentifier: string | Dataset | any[]): Plot;
        datasets(): Dataset[];
        protected _getDrawersInOrder(): Drawers.AbstractDrawer[];
        protected _generateDrawSteps(): Drawers.DrawStep[];
        protected _additionalPaint(time: number): void;
        protected _getDataToDraw(): D3.Map<any[]>;
        /**
         * Gets the new plot metadata for new dataset with provided key
         *
         * @param {string} key The key of new dataset
         */
        protected _getPlotMetadataForDataset(key: string): Plots.PlotMetadata;
        /**
         * Retrieves all of the selections of this plot for the specified dataset(s)
         *
         * @param {string | string[]} datasetKeys The dataset(s) to retrieve the selections from.
         * If not provided, all selections will be retrieved.
         * @param {boolean} exclude If set to true, all datasets will be queried excluding the keys referenced
         * in the previous datasetKeys argument (default = false).
         * @returns {D3.Selection} The retrieved selections.
         */
        getAllSelections(datasetKeys?: string | string[], exclude?: boolean): D3.Selection;
        /**
         * Retrieves all of the PlotData of this plot for the specified dataset(s)
         *
         * @param {string | string[]} datasetKeys The dataset(s) to retrieve the selections from.
         * If not provided, all selections will be retrieved.
         * @returns {PlotData} The retrieved PlotData.
         */
        getAllPlotData(datasetKeys?: string | string[]): Plots.PlotData;
        protected _getAllPlotData(datasetKeys: string[]): Plots.PlotData;
        /**
         * Retrieves PlotData with the lowest distance, where distance is defined
         * to be the Euclidiean norm.
         *
         * @param {Point} queryPoint The point to which plot data should be compared
         *
         * @returns {PlotData} The PlotData closest to queryPoint
         */
        getClosestPlotData(queryPoint: Point): Plots.PlotData;
        protected _isVisibleOnPlot(datum: any, pixelPoint: Point, selection: D3.Selection): boolean;
    }
}


declare module Plottable {
    module Plots {
        class Pie extends Plot {
            /**
             * Constructs a PiePlot.
             *
             * @constructor
             */
            constructor();
            computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): Pie;
            addDataset(keyOrDataset: any, dataset?: any): Pie;
            protected _generateAttrToProjector(): AttributeToProjector;
            protected _getDrawer(key: string): Drawers.AbstractDrawer;
            getAllPlotData(datasetKeys?: string | string[]): PlotData;
        }
    }
}


declare module Plottable {
    class XYPlot<X, Y> extends Plot {
        protected _xScale: Scale<X, number>;
        protected _yScale: Scale<Y, number>;
        /**
         * Constructs an XYPlot.
         *
         * An XYPlot is a plot from drawing 2-dimensional data. Common examples
         * include Scale.Line and Scale.Bar.
         *
         * @constructor
         * @param {any[]|Dataset} [dataset] The data or Dataset to be associated with this Renderer.
         * @param {Scale} xScale The x scale to use.
         * @param {Scale} yScale The y scale to use.
         */
        constructor(xScale: Scale<X, number>, yScale: Scale<Y, number>);
        /**
         * @param {string} attrToSet One of ["x", "y"] which determines the point's
         * x and y position in the Plot.
         */
        project(attrToSet: string, accessor: any, scale?: Scale<any, any>): XYPlot<X, Y>;
        destroy(): XYPlot<X, Y>;
        /**
         * Sets the automatic domain adjustment over visible points for y scale.
         *
         * If autoAdjustment is true adjustment is immediately performend.
         *
         * @param {boolean} autoAdjustment The new value for the automatic adjustment domain for y scale.
         * @returns {XYPlot} The calling XYPlot.
         */
        automaticallyAdjustYScaleOverVisiblePoints(autoAdjustment: boolean): XYPlot<X, Y>;
        /**
         * Sets the automatic domain adjustment over visible points for x scale.
         *
         * If autoAdjustment is true adjustment is immediately performend.
         *
         * @param {boolean} autoAdjustment The new value for the automatic adjustment domain for x scale.
         * @returns {XYPlot} The calling XYPlot.
         */
        automaticallyAdjustXScaleOverVisiblePoints(autoAdjustment: boolean): XYPlot<X, Y>;
        protected _generateAttrToProjector(): AttributeToProjector;
        computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): XYPlot<X, Y>;
        protected _updateXDomainer(): void;
        protected _updateYDomainer(): void;
        /**
         * Adjusts both domains' extents to show all datasets.
         *
         * This call does not override auto domain adjustment behavior over visible points.
         */
        showAllData(): void;
        protected _normalizeDatasets<A, B>(fromX: boolean): {
            a: A;
            b: B;
        }[];
        protected _projectorsReady(): {
            accessor: (datum: any, index?: number, userMetadata?: any, plotMetadata?: Plots.PlotMetadata) => any;
            scale?: Scale<any, any>;
            attribute: string;
        };
    }
}


declare module Plottable {
    module Plots {
        class Rectangle<X, Y> extends XYPlot<X, Y> {
            /**
             * Constructs a RectanglePlot.
             *
             * A RectanglePlot consists of a bunch of rectangles. The user is required to
             * project the left and right bounds of the rectangle (x1 and x2 respectively)
             * as well as the bottom and top bounds (y1 and y2 respectively)
             *
             * @constructor
             * @param {Scale.Scale} xScale The x scale to use.
             * @param {Scale.Scale} yScale The y scale to use.
             */
            constructor(xScale: Scale<X, any>, yScale: Scale<Y, any>);
            protected _getDrawer(key: string): Drawers.Rect;
            protected _generateAttrToProjector(): {
                [attrToSet: string]: (datum: any, index: number, userMetadata: any, plotMetadata: PlotMetadata) => any;
            };
            protected _generateDrawSteps(): Drawers.DrawStep[];
        }
    }
}


declare module Plottable {
    module Plots {
        class Scatter<X, Y> extends XYPlot<X, Y> {
            /**
             * Constructs a ScatterPlot.
             *
             * @constructor
             * @param {Scale} xScale The x scale to use.
             * @param {Scale} yScale The y scale to use.
             */
            constructor(xScale: Scale<X, number>, yScale: Scale<Y, number>);
            protected _getDrawer(key: string): Drawers.Symbol;
            protected _generateAttrToProjector(): {
                [attrToSet: string]: (datum: any, index: number, userMetadata: any, plotMetadata: PlotMetadata) => any;
            };
            protected _generateDrawSteps(): Drawers.DrawStep[];
            protected _isVisibleOnPlot(datum: any, pixelPoint: Point, selection: D3.Selection): boolean;
        }
    }
}


declare module Plottable {
    module Plots {
        class Grid extends Rectangle<any, any> {
            /**
             * Constructs a GridPlot.
             *
             * A GridPlot is used to shade a grid of data. Each datum is a cell on the
             * grid, and the datum can control what color it is.
             *
             * @constructor
             * @param {Scale.Scale} xScale The x scale to use.
             * @param {Scale.Scale} yScale The y scale to use.
             * @param {Scale.Color|Scale.InterpolatedColor} colorScale The color scale
             * to use for each grid cell.
             */
            constructor(xScale: Scale<any, any>, yScale: Scale<any, any>, colorScale: Scale<any, string>);
            addDataset(keyOrDataset: any, dataset?: any): Grid;
            protected _getDrawer(key: string): Drawers.Rect;
            /**
             * @param {string} attrToSet One of ["x", "y", "x2", "y2", "fill"]. If "fill" is used,
             * the data should return a valid CSS color.
             */
            project(attrToSet: string, accessor: any, scale?: Scale<any, any>): Grid;
            protected _generateDrawSteps(): Drawers.DrawStep[];
        }
    }
}


declare module Plottable {
    module Plots {
        class Bar<X, Y> extends XYPlot<X, Y> {
            protected static _BarAlignmentToFactor: {
                [alignment: string]: number;
            };
            protected static _DEFAULT_WIDTH: number;
            protected _isVertical: boolean;
            /**
             * Constructs a BarPlot.
             *
             * @constructor
             * @param {Scale} xScale The x scale to use.
             * @param {Scale} yScale The y scale to use.
             * @param {boolean} isVertical if the plot if vertical.
             */
            constructor(xScale: Scale<X, number>, yScale: Scale<Y, number>, isVertical?: boolean);
            protected _getDrawer(key: string): Drawers.Rect;
            protected _setup(): void;
            /**
             * Gets the baseline value for the bars
             *
             * The baseline is the line that the bars are drawn from, defaulting to 0.
             *
             * @returns {number} The baseline value.
             */
            baseline(): number;
            /**
             * Sets the baseline for the bars to the specified value.
             *
             * The baseline is the line that the bars are drawn from, defaulting to 0.
             *
             * @param {number} value The value to position the baseline at.
             * @returns {Bar} The calling Bar.
             */
            baseline(value: number): Bar<X, Y>;
            /**
             * Sets the bar alignment relative to the independent axis.
             * VerticalBarPlot supports "left", "center", "right"
             * HorizontalBarPlot supports "top", "center", "bottom"
             *
             * @param {string} alignment The desired alignment.
             * @returns {Bar} The calling Bar.
             */
            barAlignment(alignment: string): Bar<X, Y>;
            /**
             * Get whether bar labels are enabled.
             *
             * @returns {boolean} Whether bars should display labels or not.
             */
            labelsEnabled(): boolean;
            /**
             * Set whether bar labels are enabled.
             * @param {boolean} Whether bars should display labels or not.
             *
             * @returns {Bar} The calling plot.
             */
            labelsEnabled(enabled: boolean): Bar<X, Y>;
            /**
             * Get the formatter for bar labels.
             *
             * @returns {Formatter} The formatting function for bar labels.
             */
            barLabelFormatter(): Formatter;
            /**
             * Change the formatting function for bar labels.
             * @param {Formatter} The formatting function for bar labels.
             *
             * @returns {Bar} The calling plot.
             */
            barLabelFormatter(formatter: Formatter): Bar<X, Y>;
            /**
             * Retrieves the closest PlotData to queryPoint.
             *
             * Bars containing the queryPoint are considered closest. If queryPoint lies outside
             * of all bars, we return the closest in the dominant axis (x for horizontal
             * charts, y for vertical) and break ties using the secondary axis.
             *
             * @param {Point} queryPoint The point to which plot data should be compared
             *
             * @returns {PlotData} The PlotData closest to queryPoint
             */
            getClosestPlotData(queryPoint: Point): PlotData;
            protected _isVisibleOnPlot(datum: any, pixelPoint: Point, selection: D3.Selection): boolean;
            /**
             * Gets the bar under the given pixel position (if [xValOrExtent]
             * and [yValOrExtent] are {number}s), under a given line (if only one
             * of [xValOrExtent] or [yValOrExtent] are {Extent}s) or are under a
             * 2D area (if [xValOrExtent] and [yValOrExtent] are both {Extent}s).
             *
             * @param {number | Extent} xValOrExtent The pixel x position, or range of x values.
             * @param {number | Extent} yValOrExtent The pixel y position, or range of y values.
             * @returns {D3.Selection} The selected bar, or null if no bar was selected.
             */
            getBars(xValOrExtent: number | Extent, yValOrExtent: number | Extent): D3.Selection;
            protected _updateDomainer(scale: Scale<any, number>): void;
            protected _updateYDomainer(): void;
            protected _updateXDomainer(): void;
            protected _additionalPaint(time: number): void;
            protected _drawLabels(): void;
            protected _generateDrawSteps(): Drawers.DrawStep[];
            protected _generateAttrToProjector(): {
                [attrToSet: string]: (datum: any, index: number, userMetadata: any, plotMetadata: PlotMetadata) => any;
            };
            /**
             * Computes the barPixelWidth of all the bars in the plot.
             *
             * If the position scale of the plot is a CategoryScale and in bands mode, then the rangeBands function will be used.
             * If the position scale of the plot is a CategoryScale and in points mode, then
             *   from https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal_rangePoints, the max barPixelWidth is step * padding
             * If the position scale of the plot is a QuantitativeScaleScale, then _getMinimumDataWidth is scaled to compute the barPixelWidth
             */
            protected _getBarPixelWidth(): number;
            protected _getAllPlotData(datasetKeys: string[]): PlotData;
        }
    }
}


declare module Plottable {
    module Plots {
        class Line<X> extends XYPlot<X, number> {
            protected _yScale: QuantitativeScale<number>;
            /**
             * Constructs a LinePlot.
             *
             * @constructor
             * @param {QuantitativeScaleScale} xScale The x scale to use.
             * @param {QuantitativeScaleScale} yScale The y scale to use.
             */
            constructor(xScale: QuantitativeScale<X>, yScale: QuantitativeScale<number>);
            protected _rejectNullsAndNaNs(d: any, i: number, userMetdata: any, plotMetadata: any, accessor: _Accessor): boolean;
            protected _getDrawer(key: string): Drawers.Line;
            protected _getResetYFunction(): (d: any, i: number, u: any, m: PlotMetadata) => number;
            protected _generateDrawSteps(): Drawers.DrawStep[];
            protected _generateAttrToProjector(): {
                [attrToSet: string]: (datum: any, index: number, userMetadata: any, plotMetadata: PlotMetadata) => any;
            };
            protected _wholeDatumAttributes(): string[];
            protected _getAllPlotData(datasetKeys: string[]): PlotData;
            /**
             * Retrieves the closest PlotData to queryPoint.
             *
             * Lines implement an x-dominant notion of distance; points closest in x are
             * tie-broken by y distance.
             *
             * @param {Point} queryPoint The point to which plot data should be compared
             *
             * @returns {PlotData} The PlotData closest to queryPoint
             */
            getClosestPlotData(queryPoint: Point): PlotData;
        }
    }
}


declare module Plottable {
    module Plots {
        /**
         * An AreaPlot draws a filled region (area) between the plot's projected "y" and projected "y0" values.
         */
        class Area<X> extends Line<X> {
            /**
             * Constructs an AreaPlot.
             *
             * @constructor
             * @param {QuantitativeScaleScale} xScale The x scale to use.
             * @param {QuantitativeScaleScale} yScale The y scale to use.
             */
            constructor(xScale: QuantitativeScale<X>, yScale: QuantitativeScale<number>);
            protected _onDatasetUpdate(): void;
            protected _getDrawer(key: string): Drawers.Area;
            protected _updateYDomainer(): void;
            project(attrToSet: string, accessor: any, scale?: Scale<any, any>): Area<X>;
            protected _getResetYFunction(): (datum: any, index: number, userMetadata: any, plotMetadata: PlotMetadata) => any;
            protected _wholeDatumAttributes(): string[];
            protected _generateAttrToProjector(): {
                [attrToSet: string]: (datum: any, index: number, userMetadata: any, plotMetadata: PlotMetadata) => any;
            };
        }
    }
}


declare module Plottable {
    module Plots {
        interface ClusteredPlotMetadata extends PlotMetadata {
            position: number;
        }
        class ClusteredBar<X, Y> extends Bar<X, Y> {
            /**
             * Creates a ClusteredBarPlot.
             *
             * A ClusteredBarPlot is a plot that plots several bar plots next to each
             * other. For example, when plotting life expectancy across each country,
             * you would want each country to have a "male" and "female" bar.
             *
             * @constructor
             * @param {Scale} xScale The x scale to use.
             * @param {Scale} yScale The y scale to use.
             * @param {boolean} isVertical if the plot if vertical.
             */
            constructor(xScale: Scale<X, number>, yScale: Scale<Y, number>, isVertical?: boolean);
            protected _generateAttrToProjector(): {
                [attrToSet: string]: (datum: any, index: number, userMetadata: any, plotMetadata: PlotMetadata) => any;
            };
            protected _getDataToDraw(): D3.Map<any[]>;
            protected _getPlotMetadataForDataset(key: string): ClusteredPlotMetadata;
        }
    }
}


declare module Plottable {
    module Plots {
        interface StackedPlotMetadata extends PlotMetadata {
            offsets: D3.Map<number>;
        }
        type StackedDatum = {
            key: any;
            value: number;
            offset?: number;
        };
    }
    class Stacked<X, Y> extends XYPlot<X, Y> {
        protected _isVertical: boolean;
        _getPlotMetadataForDataset(key: string): Plots.StackedPlotMetadata;
        project(attrToSet: string, accessor: any, scale?: Scale<any, any>): Stacked<X, Y>;
        _onDatasetUpdate(): void;
        _updateStackOffsets(): void;
        _updateStackExtents(): void;
        /**
         * Feeds the data through d3's stack layout function which will calculate
         * the stack offsets and use the the function declared in .out to set the offsets on the data.
         */
        _stack(dataArray: D3.Map<Plots.StackedDatum>[]): D3.Map<Plots.StackedDatum>[];
        /**
         * After the stack offsets have been determined on each separate dataset, the offsets need
         * to be determined correctly on the overall datasets
         */
        _setDatasetStackOffsets(positiveDataMapArray: D3.Map<Plots.StackedDatum>[], negativeDataMapArray: D3.Map<Plots.StackedDatum>[]): void;
        _getDomainKeys(): string[];
        _generateDefaultMapArray(): D3.Map<Plots.StackedDatum>[];
        protected _extentsForAttr(attr: string): any[];
        _normalizeDatasets<A, B>(fromX: boolean): {
            a: A;
            b: B;
        }[];
        _keyAccessor(): _Accessor;
        _valueAccessor(): _Accessor;
    }
}


declare module Plottable {
    module Plots {
        class StackedArea<X> extends Area<X> {
            /**
             * Constructs a StackedArea plot.
             *
             * @constructor
             * @param {QuantitativeScaleScale} xScale The x scale to use.
             * @param {QuantitativeScaleScale} yScale The y scale to use.
             */
            constructor(xScale: QuantitativeScale<X>, yScale: QuantitativeScale<number>);
            protected _getDrawer(key: string): Drawers.Area;
            _getAnimator(key: string): Animators.PlotAnimator;
            protected _setup(): void;
            protected _additionalPaint(): void;
            protected _updateYDomainer(): void;
            project(attrToSet: string, accessor: any, scale?: Scale<any, any>): StackedArea<X>;
            protected _onDatasetUpdate(): StackedArea<X>;
            protected _generateAttrToProjector(): {
                [attrToSet: string]: (datum: any, index: number, userMetadata: any, plotMetadata: PlotMetadata) => any;
            };
            protected _wholeDatumAttributes(): string[];
            _updateStackOffsets(): void;
            _updateStackExtents(): void;
            _stack(dataArray: D3.Map<StackedDatum>[]): D3.Map<StackedDatum>[];
            _setDatasetStackOffsets(positiveDataMapArray: D3.Map<StackedDatum>[], negativeDataMapArray: D3.Map<StackedDatum>[]): void;
            _getDomainKeys(): any;
            _generateDefaultMapArray(): D3.Map<StackedDatum>[];
            protected _extentsForAttr(attr: string): any;
            _keyAccessor(): _Accessor;
            _valueAccessor(): _Accessor;
            _getPlotMetadataForDataset(key: string): StackedPlotMetadata;
            protected _normalizeDatasets<A, B>(fromX: boolean): {
                a: A;
                b: B;
            }[];
        }
    }
}


declare module Plottable {
    module Plots {
        class StackedBar<X, Y> extends Bar<X, Y> {
            /**
             * Constructs a StackedBar plot.
             * A StackedBarPlot is a plot that plots several bar plots stacking on top of each
             * other.
             * @constructor
             * @param {Scale} xScale the x scale of the plot.
             * @param {Scale} yScale the y scale of the plot.
             * @param {boolean} isVertical if the plot if vertical.
             */
            constructor(xScale?: Scale<X, number>, yScale?: Scale<Y, number>, isVertical?: boolean);
            protected _getAnimator(key: string): Animators.PlotAnimator;
            protected _generateAttrToProjector(): {
                [attrToSet: string]: (datum: any, index: number, userMetadata: any, plotMetadata: PlotMetadata) => any;
            };
            protected _generateDrawSteps(): Drawers.DrawStep[];
            project(attrToSet: string, accessor: any, scale?: Scale<any, any>): StackedBar<X, Y>;
            protected _onDatasetUpdate(): StackedBar<X, Y>;
            protected _getPlotMetadataForDataset(key: string): StackedPlotMetadata;
            protected _normalizeDatasets<A, B>(fromX: boolean): {
                a: A;
                b: B;
            }[];
            _updateStackOffsets(): void;
            _updateStackExtents(): void;
            _stack(dataArray: D3.Map<StackedDatum>[]): D3.Map<StackedDatum>[];
            _setDatasetStackOffsets(positiveDataMapArray: D3.Map<StackedDatum>[], negativeDataMapArray: D3.Map<StackedDatum>[]): void;
            _getDomainKeys(): any;
            _generateDefaultMapArray(): D3.Map<StackedDatum>[];
            protected _extentsForAttr(attr: string): any;
            _keyAccessor(): _Accessor;
            _valueAccessor(): _Accessor;
        }
    }
}


declare module Plottable {
    module Animators {
        interface PlotAnimator {
            /**
             * Applies the supplied attributes to a D3.Selection with some animation.
             *
             * @param {D3.Selection} selection The update selection or transition selection that we wish to animate.
             * @param {AttributeToProjector} attrToProjector The set of
             *     IAccessors that we will use to set attributes on the selection.
             * @return {any} Animators should return the selection or
             *     transition object so that plots may chain the transitions between
             *     animators.
             */
            animate(selection: any, attrToProjector: AttributeToProjector): D3.Selection | D3.Transition.Transition;
            /**
             * Given the number of elements, return the total time the animation requires
             * @param number numberofIterations The number of elements that will be drawn
             * @returns {any} The time required for the animation
             */
            getTiming(numberOfIterations: number): number;
        }
        type PlotAnimatorMap = {
            [animatorKey: string]: PlotAnimator;
        };
    }
}


declare module Plottable {
    module Animators {
        /**
         * An animator implementation with no animation. The attributes are
         * immediately set on the selection.
         */
        class Null implements PlotAnimator {
            getTiming(selection: any): number;
            animate(selection: any, attrToProjector: AttributeToProjector): D3.Selection;
        }
    }
}


declare module Plottable {
    module Animators {
        /**
         * The base animator implementation with easing, duration, and delay.
         *
         * The maximum delay between animations can be configured with maxIterativeDelay.
         *
         * The maximum total animation duration can be configured with maxTotalDuration.
         * maxTotalDuration does not set actual total animation duration.
         *
         * The actual interval delay is calculated by following formula:
         * min(maxIterativeDelay(),
         *   max(maxTotalDuration() - duration(), 0) / <number of iterations>)
         */
        class Base implements PlotAnimator {
            /**
             * The default duration of the animation in milliseconds
             */
            static DEFAULT_DURATION_MILLISECONDS: number;
            /**
             * The default starting delay of the animation in milliseconds
             */
            static DEFAULT_DELAY_MILLISECONDS: number;
            /**
             * The default maximum start delay between each start of an animation
             */
            static DEFAULT_MAX_ITERATIVE_DELAY_MILLISECONDS: number;
            /**
             * The default maximum total animation duration
             */
            static DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS: number;
            /**
             * The default easing of the animation
             */
            static DEFAULT_EASING: string;
            /**
             * Constructs the default animator
             *
             * @constructor
             */
            constructor();
            getTiming(numberOfIterations: number): number;
            animate(selection: any, attrToProjector: AttributeToProjector): D3.Transition.Transition;
            /**
             * Gets the duration of the animation in milliseconds.
             *
             * @returns {number} The current duration.
             */
            duration(): number;
            /**
             * Sets the duration of the animation in milliseconds.
             *
             * @param {number} duration The duration in milliseconds.
             * @returns {Default} The calling Default Animator.
             */
            duration(duration: number): Base;
            /**
             * Gets the delay of the animation in milliseconds.
             *
             * @returns {number} The current delay.
             */
            delay(): number;
            /**
             * Sets the delay of the animation in milliseconds.
             *
             * @param {number} delay The delay in milliseconds.
             * @returns {Default} The calling Default Animator.
             */
            delay(delay: number): Base;
            /**
             * Gets the current easing of the animation.
             *
             * @returns {string} the current easing mode.
             */
            easing(): string;
            /**
             * Sets the easing mode of the animation.
             *
             * @param {string} easing The desired easing mode.
             * @returns {Default} The calling Default Animator.
             */
            easing(easing: string): Base;
            /**
             * Gets the maximum start delay between animations in milliseconds.
             *
             * @returns {number} The current maximum iterative delay.
             */
            maxIterativeDelay(): number;
            /**
             * Sets the maximum start delay between animations in milliseconds.
             *
             * @param {number} maxIterDelay The maximum iterative delay in milliseconds.
             * @returns {Base} The calling Base Animator.
             */
            maxIterativeDelay(maxIterDelay: number): Base;
            /**
             * Gets the maximum total animation duration in milliseconds.
             *
             * @returns {number} The current maximum total animation duration.
             */
            maxTotalDuration(): number;
            /**
             * Sets the maximum total animation duration in miliseconds.
             *
             * @param {number} maxDuration The maximum total animation duration in milliseconds.
             * @returns {Base} The calling Base Animator.
             */
            maxTotalDuration(maxDuration: number): Base;
        }
    }
}


declare module Plottable {
    module Animators {
        /**
         * The default animator implementation with easing, duration, and delay.
         */
        class Rect extends Base {
            static ANIMATED_ATTRIBUTES: string[];
            isVertical: boolean;
            isReverse: boolean;
            constructor(isVertical?: boolean, isReverse?: boolean);
            animate(selection: any, attrToProjector: AttributeToProjector): D3.Transition.Transition;
            protected _startMovingProjector(attrToProjector: AttributeToProjector): (datum: any, index: number, userMetadata: any, plotMetadata: Plots.PlotMetadata) => any;
        }
    }
}


declare module Plottable {
    module Animators {
        /**
         * A child class of RectAnimator that will move the rectangle
         * as well as animate its growth.
         */
        class MovingRect extends Rect {
            /**
             * The pixel value to move from
             */
            startPixelValue: number;
            /**
             * Constructs a MovingRectAnimator
             *
             * @param {number} basePixel The pixel value to start moving from
             * @param {boolean} isVertical If the movement/animation is vertical
             */
            constructor(startPixelValue: number, isVertical?: boolean);
            protected _startMovingProjector(attrToProjector: AttributeToProjector): (p: any) => number;
        }
    }
}


declare module Plottable {
    class Dispatcher extends Core.PlottableObject {
        protected _event2Callback: {
            [eventName: string]: (e: Event) => any;
        };
        protected _callbacks: Utils.CallbackSet<Function>[];
        protected setCallback(callbackSet: Utils.CallbackSet<Function>, callback: Function): void;
        protected unsetCallback(callbackSet: Utils.CallbackSet<Function>, callback: Function): void;
    }
}


declare module Plottable {
    module Dispatchers {
        type MouseCallback = (p: Point, event: MouseEvent) => any;
        class Mouse extends Dispatcher {
            /**
             * Get a Dispatcher.Mouse for the <svg> containing elem. If one already exists
             * on that <svg>, it will be returned; otherwise, a new one will be created.
             *
             * @param {SVGElement} elem A svg DOM element.
             * @return {Dispatcher.Mouse} A Dispatcher.Mouse
             */
            static getDispatcher(elem: SVGElement): Dispatchers.Mouse;
            /**
             * Creates a Dispatcher.Mouse.
             * This constructor not be invoked directly under most circumstances.
             *
             * @param {SVGElement} svg The root <svg> element to attach to.
             */
            constructor(svg: SVGElement);
            /**
             * Registers a callback to be called whenever the mouse position changes,
             *
             * @param {(p: Point) => any} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            onMouseMove(callback: MouseCallback): Dispatchers.Mouse;
            /**
             * Registers the callback to be called whenever the mouse position changes,
             *
             * @param {(p: Point) => any} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            offMouseMove(callback: MouseCallback): Dispatchers.Mouse;
            /**
             * Registers a callback to be called whenever a mousedown occurs.
             *
             * @param {(p: Point) => any} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            onMouseDown(callback: MouseCallback): Dispatchers.Mouse;
            /**
             * Registers the callback to be called whenever a mousedown occurs.
             *
             * @param {(p: Point) => any} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            offMouseDown(callback: MouseCallback): Dispatchers.Mouse;
            /**
             * Registers a callback to be called whenever a mouseup occurs.
             *
             * @param {(p: Point) => any} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            onMouseUp(callback: MouseCallback): Dispatchers.Mouse;
            /**
             * Registers the callback to be called whenever a mouseup occurs.
             *
             * @param {(p: Point) => any} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            offMouseUp(callback: MouseCallback): Dispatchers.Mouse;
            /**
             * Registers a callback to be called whenever a wheel occurs.
             *
             * @param {MouseCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space.
             *                                     Pass `null` to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            onWheel(callback: MouseCallback): Dispatchers.Mouse;
            /**
             * Registers the callback to be called whenever a wheel occurs.
             *
             * @param {MouseCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space.
             *                                     Pass `null` to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            offWheel(callback: MouseCallback): Dispatchers.Mouse;
            /**
             * Registers a callback to be called whenever a dblClick occurs.
             *
             * @param {MouseCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space.
             *                                     Pass `null` to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            onDblClick(callback: MouseCallback): Dispatchers.Mouse;
            /**
             * Registers the callback to be called whenever a dblClick occurs.
             *
             * @param {MouseCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space.
             *                                     Pass `null` to remove a callback.
             * @return {Dispatcher.Mouse} The calling Dispatcher.Mouse.
             */
            offDblClick(callback: MouseCallback): Dispatchers.Mouse;
            /**
             * Returns the last computed mouse position.
             *
             * @return {Point} The last known mouse position in <svg> coordinate space.
             */
            getLastMousePosition(): {
                x: number;
                y: number;
            };
        }
    }
}


declare module Plottable {
    module Dispatchers {
        type TouchCallback = (ids: number[], idToPoint: {
            [id: number]: Point;
        }, event: TouchEvent) => any;
        class Touch extends Dispatcher {
            /**
             * Get a Dispatcher.Touch for the <svg> containing elem. If one already exists
             * on that <svg>, it will be returned; otherwise, a new one will be created.
             *
             * @param {SVGElement} elem A svg DOM element.
             * @return {Dispatcher.Touch} A Dispatcher.Touch
             */
            static getDispatcher(elem: SVGElement): Dispatchers.Touch;
            /**
             * Creates a Dispatcher.Touch.
             * This constructor should not be invoked directly under most circumstances.
             *
             * @param {SVGElement} svg The root <svg> element to attach to.
             */
            constructor(svg: SVGElement);
            /**
             * Registers a callback to be called whenever a touch starts.
             *
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            onTouchStart(callback: TouchCallback): Dispatchers.Touch;
            /**
             * Removes the callback to be called whenever a touch starts.
             *
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            offTouchStart(callback: TouchCallback): Dispatchers.Touch;
            /**
             * Registers a callback to be called whenever the touch position changes.
             *
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            onTouchMove(callback: TouchCallback): Dispatchers.Touch;
            /**
             * Removes the callback to be called whenever the touch position changes.
             *
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            offTouchMove(callback: TouchCallback): Dispatchers.Touch;
            /**
             * Registers a callback to be called whenever a touch ends.
             *
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            onTouchEnd(callback: TouchCallback): Dispatchers.Touch;
            /**
             * Removes the callback to be called whenever a touch ends.
             *
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            offTouchEnd(callback: TouchCallback): Dispatchers.Touch;
            /**
             * Registers a callback to be called whenever a touch is cancelled.
             *
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            onTouchCancel(callback: TouchCallback): Dispatchers.Touch;
            /**
             * Removes the callback to be called whenever a touch is cancelled.
             *
             * @param {TouchCallback} callback A callback that takes the pixel position
             *                                     in svg-coordinate-space. Pass `null`
             *                                     to remove a callback.
             * @return {Dispatcher.Touch} The calling Dispatcher.Touch.
             */
            offTouchCancel(callback: TouchCallback): Dispatchers.Touch;
        }
    }
}


declare module Plottable {
    module Dispatchers {
        type KeyCallback = (keyCode: number, event: KeyboardEvent) => any;
        class Key extends Dispatcher {
            /**
             * Get a Dispatcher.Key. If one already exists it will be returned;
             * otherwise, a new one will be created.
             *
             * @return {Dispatcher.Key} A Dispatcher.Key
             */
            static getDispatcher(): Dispatchers.Key;
            /**
             * Creates a Dispatcher.Key.
             * This constructor not be invoked directly under most circumstances.
             *
             * @param {SVGElement} svg The root <svg> element to attach to.
             */
            constructor();
            /**
             * Registers a callback to be called whenever a key is pressed.
             *
             * @param {KeyCallback} callback
             * @return {Dispatcher.Key} The calling Dispatcher.Key.
             */
            onKeyDown(callback: KeyCallback): Key;
            /**
             * Removes the callback to be called whenever a key is pressed.
             *
             * @param {KeyCallback} callback
             * @return {Dispatcher.Key} The calling Dispatcher.Key.
             */
            offKeyDown(callback: KeyCallback): Key;
        }
    }
}


declare module Plottable {
    class Interaction extends Core.PlottableObject {
        /**
         * It maintains a 'hitBox' which is where all event listeners are
         * attached. Due to cross- browser weirdness, the hitbox needs to be an
         * opaque but invisible rectangle.  TODO: We should give the interaction
         * "foreground" and "background" elements where it can draw things,
         * e.g. crosshairs.
         */
        protected _componentToListenTo: Component;
        _anchor(component: Component): void;
        /**
         * Translates an <svg>-coordinate-space point to Component-space coordinates.
         *
         * @param {Point} p A Point in <svg>-space coordinates.
         *
         * @return {Point} The same location in Component-space coordinates.
         */
        protected _translateToComponentSpace(p: Point): Point;
        /**
         * Checks whether a Component-coordinate-space Point is inside the Component.
         *
         * @param {Point} p A Point in Coordinate-space coordinates.
         *
         * @return {boolean} Whether or not the point is inside the Component.
         */
        protected _isInsideComponent(p: Point): boolean;
    }
}


declare module Plottable {
    type ClickCallback = (point: Point) => any;
    module Interactions {
        class Click extends Interaction {
            _anchor(component: Component): void;
            /**
             * Sets the callback called when the Component is clicked.
             *
             * @param {ClickCallback} callback The callback to set.
             * @return {Interaction.Click} The calling Interaction.Click.
             */
            onClick(callback: ClickCallback): Click;
            /**
             * Removes the callback from click.
             *
             * @param {ClickCallback} callback The callback to remove.
             * @return {Interaction.Click} The calling Interaction.Click.
             */
            offClick(callback: ClickCallback): Click;
        }
    }
}


declare module Plottable {
    module Interactions {
        class DoubleClick extends Interaction {
            _anchor(component: Component): void;
            /**
             * Sets the callback called when the Component is double-clicked.
             *
             * @param {ClickCallback} callback The callback to set.
             * @return {Interaction.DoubleClick} The calling Interaction.DoubleClick.
             */
            onDoubleClick(callback: ClickCallback): void;
            /**
             * Removes the callback called when the Component is double-clicked.
             *
             * @param {ClickCallback} callback The callback to remove.
             * @return {Interaction.DoubleClick} The calling Interaction.DoubleClick.
             */
            offDoubleClick(callback: ClickCallback): void;
        }
    }
}


declare module Plottable {
    type KeyCallback = (keyCode: number) => void;
    module Interactions {
        class Key extends Interaction {
            _anchor(component: Component): void;
            /**
             * Sets a callback to be called when the key with the given keyCode is
             * pressed and the user is moused over the Component.
             *
             * @param {number} keyCode The key code associated with the key.
             * @param {KeyCallback} callback Callback to be set.
             * @returns The calling Interaction.Key.
             */
            onKey(keyCode: number, callback: KeyCallback): Key;
            /**
             * Removes the callback to be called when the key with the given keyCode is
             * pressed and the user is moused over the Component.
             *
             * @param {number} keyCode The key code associated with the key.
             * @param {KeyCallback} callback Callback to be removed.
             * @returns The calling Interaction.Key.
             */
            offKey(keyCode: number, callback: KeyCallback): Key;
        }
    }
}


declare module Plottable {
    type PointerCallback = (point: Point) => any;
    module Interactions {
        class Pointer extends Interaction {
            _anchor(component: Component): void;
            /**
             * Sets the callback called when the pointer enters the Component.
             *
             * @param {PointerCallback} callback The callback to set.
             * @return {Interaction.Pointer} The calling Interaction.Pointer.
             */
            onPointerEnter(callback: PointerCallback): Pointer;
            /**
             * Removes a callback called when the pointer enters the Component.
             *
             * @param {PointerCallback} callback The callback to remove.
             * @return {Interaction.Pointer} The calling Interaction.Pointer.
             */
            offPointerEnter(callback: PointerCallback): Pointer;
            /**
             * Sets the callback called when the pointer moves.
             *
             * @param {PointerCallback} callback The callback to set.
             * @return {Interaction.Pointer} The calling Interaction.Pointer.
             */
            onPointerMove(callback: PointerCallback): Pointer;
            /**
             * Removes a callback called when the pointer moves.
             *
             * @param {PointerCallback} callback The callback to remove.
             * @return {Interaction.Pointer} The calling Interaction.Pointer.
             */
            offPointerMove(callback: PointerCallback): Pointer;
            /**
             * Sets the callback called when the pointer exits the Component.
             *
             * @param {PointerCallback} callback The callback to set.
             * @return {Interaction.Pointer} The calling Interaction.Pointer.
             */
            onPointerExit(callback: PointerCallback): Pointer;
            /**
             * Removes a callback called when the pointer exits the Component.
             *
             * @param {PointerCallback} callback The callback to remove.
             * @return {Interaction.Pointer} The calling Interaction.Pointer.
             */
            offPointerExit(callback: PointerCallback): Pointer;
        }
    }
}


declare module Plottable {
    module Interactions {
        class PanZoom extends Interaction {
            /**
             * The number of pixels occupied in a line.
             */
            static PIXELS_PER_LINE: number;
            /**
             * Creates a PanZoomInteraction.
             *
             * The allows you to move around and zoom in on a plot, interactively. It
             * does so by changing the xScale and yScales' domains repeatedly.
             *
             * @constructor
             * @param {QuantitativeScaleScale} [xScale] The X scale to update on panning/zooming.
             * @param {QuantitativeScaleScale} [yScale] The Y scale to update on panning/zooming.
             */
            constructor(xScale?: QuantitativeScale<any>, yScale?: QuantitativeScale<any>);
            _anchor(component: Component): void;
        }
    }
}


declare module Plottable {
    type DragCallback = (start: Point, end: Point) => any;
    module Interactions {
        class Drag extends Interaction {
            _anchor(component: Component): void;
            /**
             * Returns whether or not this Interactions constrains Points passed to its
             * callbacks to lie inside its Component.
             *
             * If true, when the user drags outside of the Component, the closest Point
             * inside the Component will be passed to the callback instead of the actual
             * cursor position.
             *
             * @return {boolean} Whether or not the Interactions.Drag constrains.
             */
            constrainToComponent(): boolean;
            /**
             * Sets whether or not this Interactions constrains Points passed to its
             * callbacks to lie inside its Component.
             *
             * If true, when the user drags outside of the Component, the closest Point
             * inside the Component will be passed to the callback instead of the actual
             * cursor position.
             *
             * @param {boolean} constrain Whether or not to constrain Points.
             * @return {Interactions.Drag} The calling Interactions.Drag.
             */
            constrainToComponent(constrain: boolean): Drag;
            /**
             * Sets the callback to be called when dragging starts.
             *
             * @param {DragCallback} callback The callback to be called. Takes in a Point in pixels.
             * @returns {Drag} The calling Interactions.Drag.
             */
            onDragStart(callback: DragCallback): Drag;
            /**
             * Removes the callback to be called when dragging starts.
             *
             * @param {DragCallback} callback The callback to be removed.
             * @returns {Drag} The calling Interactions.Drag.
             */
            offDragStart(callback: DragCallback): Drag;
            /**
             * Adds a callback to be called during dragging.
             *
             * @param {DragCallback} callback The callback to be called. Takes in Points in pixels.
             * @returns {Drag} The calling Interactions.Drag.
             */
            onDrag(callback: DragCallback): Drag;
            /**
             * Removes a callback to be called during dragging.
             *
             * @param {DragCallback} callback The callback to be removed.
             * @returns {Drag} The calling Interactions.Drag.
             */
            offDrag(callback: DragCallback): Drag;
            /**
             * Adds a callback to be called when the dragging ends.
             *
             * @param {DragCallback} callback The callback to be called. Takes in Points in pixels.
             * @returns {Drag} The calling Interactions.Drag.
             */
            onDragEnd(callback: DragCallback): Drag;
            /**
             * Removes a callback to be called when the dragging ends.
             *
             * @param {DragCallback} callback The callback to be removed
             * @returns {Drag} The calling Interactions.Drag.
             */
            offDragEnd(callback: DragCallback): Drag;
        }
    }
}


declare module Plottable {
    type DragBoxCallback = (bounds: Bounds) => any;
    module Components {
        class DragBoxLayer extends Components.SelectionBoxLayer {
            protected _hasCorners: boolean;
            constructor();
            protected _setup(): void;
            _doRender(): void;
            /**
             * Gets the detection radius of the drag box.
             *
             * @return {number} The detection radius of the drag box.
             */
            detectionRadius(): number;
            /**
             * Sets the detection radius of the drag box.
             *
             * @param {number} r The desired detection radius.
             * @return {DragBoxLayer} The calling DragBoxLayer.
             */
            detectionRadius(r: number): DragBoxLayer;
            /**
             * Gets whether or not the drag box is resizable.
             *
             * @return {boolean} Whether or not the drag box is resizable.
             */
            resizable(): boolean;
            /**
             * Sets whether or not the drag box is resizable.
             *
             * @param {boolean} canResize Whether or not the drag box should be resizable.
             * @return {DragBoxLayer} The calling DragBoxLayer.
             */
            resizable(canResize: boolean): DragBoxLayer;
            protected _setResizableClasses(canResize: boolean): void;
            /**
             * Sets the callback to be called when dragging starts.
             *
             * @param {DragBoxCallback} callback The callback to be called. Passed the current Bounds in pixels.
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            onDragStart(callback: DragBoxCallback): DragBoxLayer;
            /**
             * Removes a callback to be called when dragging starts.
             *
             * @param {DragBoxCallback} callback The callback to be removed.
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            offDragStart(callback: DragBoxCallback): DragBoxLayer;
            /**
             * Sets a callback to be called during dragging.
             *
             * @param {DragBoxCallback} callback The callback to be called. Passed the current Bounds in pixels.
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            onDrag(callback: DragBoxCallback): DragBoxLayer;
            /**
             * Removes a callback to be called during dragging.
             *
             * @param {DragBoxCallback} callback The callback to be removed.
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            offDrag(callback: DragBoxCallback): DragBoxLayer;
            /**
             * Sets a callback to be called when the dragging ends.
             *
             * @param {DragBoxCallback} callback The callback to be called. Passed the current Bounds in pixels.
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            onDragEnd(callback: DragBoxCallback): DragBoxLayer;
            /**
             * Removes a callback to be called when the dragging ends.
             *
             * @param {DragBoxCallback} callback The callback to be removed.
             * @returns {DragBoxLayer} The calling DragBoxLayer.
             */
            offDragEnd(callback: DragBoxCallback): DragBoxLayer;
        }
    }
}


declare module Plottable {
    module Components {
        class XDragBoxLayer extends DragBoxLayer {
            constructor();
            computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): XDragBoxLayer;
            protected _setBounds(newBounds: Bounds): void;
            protected _setResizableClasses(canResize: boolean): void;
        }
    }
}


declare module Plottable {
    module Components {
        class YDragBoxLayer extends DragBoxLayer {
            constructor();
            computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number): YDragBoxLayer;
            protected _setBounds(newBounds: Bounds): void;
            protected _setResizableClasses(canResize: boolean): void;
        }
    }
}
