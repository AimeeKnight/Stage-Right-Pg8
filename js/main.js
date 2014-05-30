(function(){

  "use strict";

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $("#submit").click(buildUrl);
    $("input, select").change(calculateVoiceWorkshopTotal);
    //$("input, select").change(calculateTotal);
  }

  function getNames(){
    var names = [];
    var $names = $("input[name=names]");
    $names.each(function(index, name){
      name = $(name).val();
      if (name){
        names.push(name);
      }
    });
    names.join();
    return names;
  }

  function calculateTotal(){
    var $paymentOption = $("#payment_option").find(":selected").val();
    var $quantity = $("input[name=quantity]").val();
    if ($quantity == "" && $paymentOption != "none") {
      $("input[name=quantity]").val("1");
    }
    var $total = 0;

    if ($paymentOption === "pay_in_full") {
      $total = 225

      if ($quantity > 0) {
        $total =  $total * $quantity
      };
    } else if ($paymentOption === "pay_deposit") {
      $total = 125

      if ($quantity > 0) {
        $total =  $total * $quantity
      };
    };

    $("#total").text($total);
    return $total
  }

  function calculateVoiceWorkshopTotal(){
    var $total = 0;
    var $qty = $("select#voice-option-qty > option:selected").text();
    if (($qty * 1) >= 2){
      var total = $qty * 100;
      var discount = total * .10;
      total -= discount;
    } else if ($qty === "1") {
      total = 100;
    }else {
      total = 0
    }
    $("#total").text(total);
    return total;
  }

  function buildUrl(){
    var items = 0;
    var names = getNames();
    var url = "https://rcsf.trail-staging.us/widget?campaign_id=2834&schedule=0&success_url=http%3A//www.rochesterchristianschool.org/&cart[desc]=Camp"

    var $paymentOption = $("#payment_option").find(":selected").val();
    var $assistance = $("#assistance").is(":checked")
    var $quantity = parseInt($("input[name=quantity]").val());

    var workshopTotal = calculateVoiceWorkshopTotal();
    var $workshopQty = $("select#voice-option-qty > option:selected").text() *1;
    var $workshopId = $("select#voice-option > option:selected").attr('value');
    var $workshopDescription = $("select#voice-option > option:selected").text();
    var $emergencyNumber = $("input[name=phone]").val();

    if (workshopTotal > 0) {
      items ++;
      url += "&cart[items]["+items+"][desc]="+$workshopDescription;
      url += "&cart[items]["+items+"][amount]="+workshopTotal;
      url += "&cart[items]["+items+"][product_id]="+$workshopId;
      url += "&cart[items]["+items+"][quantity]="+$workshopQty;
    }

    if ($paymentOption === "pay_in_full") {
      url += "&cart[items]["+items+"][desc]=Child+Payment";
      url += "&cart[items]["+items+"][amount]=225";
    } else {
      url += "&cart[items]["+items+"][desc]=Child+Deposit";
      url += "&cart[items]["+items+"][amount]=125";
    };

    url += "&cart[items]["+items+"][product_id]="+$paymentOption;
    url += "&cart[items]["+items+"][quantity]="+$quantity;

    if (names.length !== 0) {
      url += "&cart[items]["+items+"][notes]="+names;
    }

    if ($assistance) {
      items ++;
      url += "&cart[items]["+items+"][amount]=0";
      url += "&cart[items]["+items+"][desc]=Assistance";
      url += "&cart[items]["+items+"][product_id]=payment_assistance";
      url += "&cart[items]["+items+"][quantity]=0";
    };

    //window.location.href = url;
    alert(url);
  }

})();
