$.fn.nearest = function(selector) {
  var allFound = $(selector);

  if (!allFound.length) // selector not found in the dom
    return $([]);

  if (allFound.length == 1) // found one elem only
    return allFound;
  else
    return nearestRec($(this), selector);

  function nearestRec(elems, selector) {
    if (elems.length == 0)
      return this;

    var selector = selector;
    var newList = [],
      found = $([]);

    $(elems).each(function(i, e) {
      var options = e[1] || {};
      e = $($(e)[0]);

      // children
      if (!options.ignoreChildren)
        updateFound(e.children(), selector, newList, found, {
          ignoreParent: true
        });

      // next
      if (!options.ignoreNext)
        updateFound(e.next(), selector, newList, found, {
          ignoreParent: true,
          ignorePrev: true
        });

      // prev
      if (!options.ignorePrev)
        updateFound(e.prev(), selector, newList, found, {
          ignoreParent: true,
          ignoreNext: true
        });

      // parent
      if (!options.ignoreParent)
        updateFound(e.parent(), selector, newList, found, {
          ignoreChildren: true
        });
    });

    return found.length && found || nearestRec(newList, selector);

    function updateFound(e, selector, newList, found, options) {
      e.each(function() {
        var el = $(this);
        if (el.is(selector)) {
          found.push(el);
          return;
        }

        newList.push([el, options]);
      });
    }
  }
};
