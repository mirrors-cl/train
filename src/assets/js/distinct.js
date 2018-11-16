
Array.prototype.unique = function(key) {
  var arr = this;
  var n = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (key === undefined) {
      if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
    } else {
      inner: {
        var has = false;
        for (var j = 0; j < n.length; j++) {
          if (arr[i][key] == n[j][key]) {
            has = true;
            break inner;
          }
        }
      }
      if (!has) {
        n.push(arr[i]);
      }
    }
  }
  return n;
}

export {
  unique
}
