let skus = {};
let rakes = [];
let rackCap = {};
let BASE_URL = "http://localhost:8080/";
let RACK_URL = BASE_URL + "racks";
let SKU_URL = BASE_URL + "sku";
let CHECK_SKU = BASE_URL + "checkSKU";
let CHECK_CAPACITY = BASE_URL + "racks-capacity";
let ADD_ITEMS = BASE_URL + "add";

function getRacks() {
  $.ajax({
    url: RACK_URL,
    success: function (data) {
      let html = "";
      $.each(data.data, function (i, item) {
        html +=
          `<div class="row mt-2" ><div class="col-auto">
               <label for="exampleInputEmail1" class="form-label mt-1"
               >` +
          item.name +
          `</label
               >
            </div>
            <div class="col-auto">
               <input
               type="text"
               name="scan"
               class="form-control"
               value="` +
          item.order_no +
          `"
               />
            </div></div>`;
      });
      $("#rack-items").html(html);
      $("#rakes").modal("show");
    },
  });
}

function getSKU(show = false) {
  $.ajax({
    url: SKU_URL,
    success: function (data) {
      let html = "";
      $.each(data.data, function (i, item) {
        skus[item.name] = item.capacity;
        html +=
          `<div class="row mt-2" ><div class="col-auto">
               <label for="exampleInputEmail1" class="form-label mt-1"
               >` +
          item.name +
          `</label
               >
            </div>
            <div class="col-auto">
               <input
               type="text"
               name="scan"
               class="form-control"
               value="` +
          item.capacity +
          `"
               />
            </div></div>`;
      });
      $("#sku-items").html(html);
      if (show) {
        $("#sku").modal("show");
      }
    },
  });
}

function manageList(sku) {
  if ($("#sku_" + sku).length) {
    let value = $("#sku_" + sku + ' input[name="qty"]').val();
    let chcek = checkSuggesionts(sku, Number(value));
    if (!chcek) {
      return;
    }
    $("#sku_" + sku + ' input[name="qty"]').val(Number(value) + Number(1));
    checkSKUCap(sku, Number(value) + Number(1));
  } else {
    let html = "";
    $.ajax({
      url: CHECK_SKU,
      method: "POST",
      data: { id: sku },
      success: function (data) {
        if (data) {
          html +=
            `<tr id="sku_` +
            data[0].name +
            `">
            <td class="col-1">
               <div class="col-11">
                  <input
                  readonly
                  type="hidden"
                  name="sku_id"
                  value="` +
            data[0].id +
            `"
               />
               <input
                  readonly
                  type="text"
                  class="form-control"
                  value="` +
            data[0].name +
            `"
               />
               </div>
            </td>
            <td class="col-1">
               <div class="col-11">
               <input
                  readonly
                  type="text"
                  name="qty"
                  class="form-control"
                  value="1"
               />
               </div>
            </td>
            <td class="col-1">
               <div class="col-11">
               <input
                  readonly
                  type="text"
                  name="rack_id"
                  class="form-control"
               />
               </div>
            </td>
            <td class="col-1 addBtn">
            </td>
         </tr>`;
          $("#items").append(html);
          checkSKUCap(sku, 1);
        } else {
          $("#sku-enter").val("");
          alert("SKU not registered.");
        }
      },
    });
  }
}

function checkSuggesionts(sku, qty) {
  if (rakes.length == 0) {
    alert("No Space available.");
    return false;
  }
  let volum = Number(skus[sku]) * qty;
  let selRack;
  $.each(rakes, function (i, item) {
    let percent = ((volum * 100) / item.fttl).toFixed(2);
    if (Number(percent) <= 100 && Number(percent) > 90) {
      selRack = true;
      alert("Please click on done button to continue.");
      return false;
    }
  });
  if (selRack) {
    return false;
  } else {
    return true;
  }
}

function checkSKUCap(sku, qty) {
  let volum = Number(skus[sku]) * qty;
  let selRack;
  $.each(rakes, function (i, item) {
    let percent = ((volum * 100) / item.fttl).toFixed(2);
    if (Number(percent) <= 100 && Number(percent) > 90) {
      selRack = item;
      return;
    }
  });
  if (selRack) {
    $(".addBtn button").remove();
    $("#sku_" + sku + " .addBtn").append(
      '<button class="btn btn-primary" onclick="done(\'' +
        sku +
        "');\">Done</button>"
    );
    $("#sku_" + sku + ' input[name="rack_id"]').val(selRack.name);
  }
}

function done(sku) {
  let sku_id = $("#sku_" + sku + ' input[name="sku_id"]').val();
  let rack = $("#sku_" + sku + ' input[name="rack_id"]').val();
  let rack_id = rackCap[rack].id;
  let quantity = $("#sku_" + sku + ' input[name="qty"]').val();
  let total = Number(skus[sku]) * Number(quantity);
  $.ajax({
    url: ADD_ITEMS,
    method: "POST",
    data: { sku_id, rack_id, quantity, total },
    success: function (data) {
      if (data) {
        $("#sku_" + sku + ' input[name="qty"]').val(0);
        $("#sku_" + sku + ' input[name="rack_id"]').val("");
        $("#sku_" + sku + " .addBtn button").remove();
        rackCapacity();
      }
    },
  });
}

function rackCapacity() {
  $.ajax({
    url: CHECK_CAPACITY,
    success: function (data) {
      rakes = [];
      rackCap = {};
      $.each(data, function (i, item) {
        if (item.fttl != "0.00" || item.fttl != 0) {
          rakes.push(item);
          rackCap[item.name] = { id: item.id, cap: item.fttl };
        }
      });
    },
  });
}
