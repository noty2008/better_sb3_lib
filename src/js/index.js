"use strict";
const setFileDrop = function(callback, errcallback) {
  if (!window.File) {
    window.alert("can't use File API on your browser") return
  }
  var drop = document.body drop.addEventListener("dragover", function(e) {
    e.preventDefault()
  }, !1);
  drop.addEventListener("drop", function(e) {
    var files = event.dataTransfer.files
    if (files.length > 0) {
      var f = files[0]
      var reader = new FileReader() reader.onerror = function(e) {
        errcallback("reader onerror")
      }
      console.log(f) reader.f = f;
      reader.onload = function(e) {
        try {
          const unzip = new Zlib.Unzip(new Uint8Array(e.target.result)) const filenames = unzip.getFilenames() const bytes = unzip.decompress("project.json") const decoder = new TextDecoder("utf-8");
          const sjson = decoder.decode(Uint8Array.from(bytes).buffer);
          const json = JSON.parse(sjson) console.log(json) if (json.targets) {
            callback(json)
          } else {
            errcallback("not sb3 file")
          }
        } catch (e) {
          errcallback("not zip file")
        }
      };
      reader.readAsArrayBuffer(f)
    }
    e.preventDefault()
  })
}
const getCountBlocks2 = function(data) {
  var blkcnt = 0
  for (var i = 0; i < data.children.length; i++) {
    const scs = data.children[i].scripts
    if (scs) {
      blkcnt += scs.length
    }
  }
  return blkcnt
}
const getCountBlocks = function(data) {
  if (data.info) {
    return -1
  }
  const target = data.targets
  var blkcnt = 0
  for (var i = 0; i < target.length; i++) {
    const t = target[i]
    const name = t.name
    const vars = t.variables
    const blocks = t.blocks
    var cnt = 0
    for (var id in blocks) {
      const b = blocks[id]
      if (!b.parent) {
        console.log(b.opcode, id)
      }
      cnt++
    }
    blkcnt += cnt
  }
  return blkcnt
}
