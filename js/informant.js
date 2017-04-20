function Informant(){


    this.messages = function() {

        var html = [];

        for(var key in citiesArray) {
            citiesArray[key].getLowStock();
            html.push(citiesArray[key].getLowStock());
        }
        $('#informant').html(html.join('\n'));
    };


}
