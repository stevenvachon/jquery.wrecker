# jquery.wRECkeR
> wRECkeR: Responsive Equal-Height Columns and Rows


## THIS LIBRARY IS OBSOLETE!
Unless you're supporting _extremely_ old browsers, you should instead be using [flexbox](https://developer.mozilla.org/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox).

---

Wrecker is a dynamic layout plugin for jQuery that achieves equal-height rows in a grid layout. Similar to a `float` layout in that excess "cells" are moved to the following "row". However, unlike, in that columns line up vertically and the cells of each row are equal in height based on their contents, just like a `<table>`. No static heights required.

Check out the [simple demo](https://stevenvachon.github.io/jquery.wrecker/simple.html) and the [advanced demo](https://stevenvachon.github.io/jquery.wrecker/advanced.html). Note: they have not been tested with Internet Explorer™ 7 and below.


## Usage

Start with a `float` layout.

```html
<div id="container">
  <div class="item">…</div>
  <div class="item">…</div>
  <div class="item">…</div>
  <div class="item">…</div>
  …
</div>
```

```css
.item {
  float: left;
  width: 25%;
}
```

Add jQuery and the Wrecker script.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
<script src="/path/to/jquery.wrecker.min.js"></script>
```

It is recommended that you specify `itemSelector`, `maxColumns` and `responsiveColumns`.

```js
$(function() {
  $('#container').wrecker({
    // options
    itemSelector : '.item',
    maxColumns : 4,
    responsiveColumns : [
      // windowMaxWidth : columns
      // windowMaxWidth order and values should match those in your responsive CSS
      { 1024 : 3 },
      { 800  : 2 },
      { 40  : 1 }
    ]
  });
});
```


## How it works

The previous layout is converted into a `display:table` layout where the responsive column span is handled by dynamically adding and removing `<div>` "rows" around the "cells". Equal-height rows are handled automatically by the browser (very fast). Responsive column widths are handled with standard CSS.

Single-column layouts and those with JavaScript disabled will be served the `float` layout.


## Important Notes

Due to the nature of `display:table` layouts, there are a few possible issues:

1. There is currently no known `colspan`/`rowspan` equivalent in CSS
2. `max-width` is ignored on the main element (`#container` in the above example)
3. `margin` values will be ignored on the cells. You will need to do something like [Inside-Only CSS Table border-spacing](https://svachon.com/blog/inside-only-css-table-border-spacing/). Check out the [advanced demo](https://stevenvachon.github.io/jquery.wrecker/advanced.html).


## Other Functions

To recalculate the grid. Useful for adding new items.
```js
.wrecker('reload');
```

To remove Wrecker functionality completely and return the element back to its pre-initialized state.
```js
.wrecker('destroy');
```
