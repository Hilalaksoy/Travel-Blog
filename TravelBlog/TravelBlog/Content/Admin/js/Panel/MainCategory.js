$(document).ready(function () {
    GetCategories();
});


function GetCategories() {
    var parameter = {
        categoryName: $("#txtSearch").val(),
    }
    $.ajax({
        type: "POST",
        url: '/Panel/MainCategory/GetCategories',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(parameter),
        error: function () {

        },
        success: function (result) {
            var content = "";
            for (var i = 0; i < result.length; i++) {
                content += "<tr>" +
                    "<td>" + result[i].Id + "</td>" +
                    "<td>" + result[i].Title + "</td>" +
                    "<td>" + result[i].Summary + "</td>";
                if (result[i].IsActive == true) {
                    content += "<td>Aktif</td>";
                }
                else {
                    content += "<td>Pasif</td>";
                }
                content += "<td class='center'><a href='#' onclick='UpdateDetails(" + result[i].Id + ")' ><i class='ion-compose'></i></a></td>";
                content += "<td class='center'><a href='#' onclick='OpenModalForDelete(" + result[i].Id + ")' ><i class='ion-compose'></i></a></td>";
                content += "</tr>";
                $("#txtSearch").val("");
            }
            $("#tbody_list").html(content);
        }
    });
}



function AddMainCategory() {

    var parameter = {
        CategoryName: $("#txtCategoryName").val(),
        Content: $("#txtContent").val(),
        IsActive: $("#ddIsActive").val(),
    }
    $.ajax({
        type: "POST",
        url: '/Panel/MainCategory/AddCategory',
        dataType: "json",
        data: JSON.stringify(parameter),
        contentType: "application/json; charset=utf-8",
        error: function () {
            alertify.error("Kategori eklenirken bir hata oluştu");
            $("#exampleModalform > button").click();
        },
        success: function (result) {
            if (result == false) {
                alertify.error("Kategori eklenirken bir hata oluştu!");

            }
            else {
                GetCategories();
                alertify.success("Kategori başarıyla Eklendi!");
            }
            $("#txtCategoryName").val("");
            $("#txtContent").val("");
            $('#exampleModalform').modal('toggle')
        }
    });
}


function UpdateDetails(Id) {
    var parameter = {
        Id: Id
    }
    $.ajax({
        type: "POST",
        url: '/Panel/MainCategory/GetMainCategory',
        dataType: "json",
        data: JSON.stringify(parameter),
        contentType: "application/json; charset=utf-8",
        error: function () {
            alertify.error("Güncelleme esnasında bir hata oluştu!");
            //$("#modal_Duzenle > button").click();
        },
        success: function (result) {
           
            $("#currentId").val(result.Id);
            $("#txtUpdateCategoryName").val(result.CategoryName);
            $("#txtUpdateContent").val(result.Content);
            $("#ddUpdateIsActive").val(result.IsActive.toString());
            //$('#ddGuncelAktifmi').val(sonuc.Aktifmi.toString());

            $('#updateModalForm').modal('toggle');

        }
    });
}


function Update() {
    alert($("#currentId").val())
    var formdata = new FormData();

    formdata.append("Id", $("#currentId").val());
    formdata.append("CategoryName", $("#txtUpdateCategoryName").val());
    formdata.append("Content", $("#txtUpdateContent").val());
    formdata.append("IsActive", $("#ddUpdateIsActive").val());

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/Panel/MainCategory/UpdateCategory');
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var result = JSON.parse(xhr.responseText);
            if (result == true) {
                GetCategories();
                $('#updateModalForm').modal('toggle');
                alertify.success("Güncelleme işlemi başarıyla gerçekleştirildi.");
            }
            else if (result == false) {
                alertify.error("Güncelleme sırasında bir hata oluştu. Tekrar Deneyin!");
            }
            return true;
        }
        else {
            return false;
        }
    }


}


function OpenModalForDelete(Id) {
    alertify.confirm("Silmek istediğinize emin misiniz?", function (ev) {
        ev.preventDefault();
        DeleteMainCategory(Id);
    }, function (ev) {
        ev.preventDefault();
    });

}


function DeleteMainCategory(Id) {
    var parameter = {
        Id: Id
    }
    $.ajax({
        type: "POST",
        url: '/Panel/MainCategory/DeleteCategory',
        dataType: "json",
        data: JSON.stringify(parameter),
        contentType: "application/json; charset=utf-8",
        error: function () {
            alertify.error("Kategori silme esnasında bir hata oluştu!");
        },
        success: function (result) {
            if (result == false) {
                alertify.error("Kategori silme esnasında bir hata oluştu!");
            }
            else {
                GetCategories();
                alertify.success("Silme işlemi başarıyla gerçekleştirildi");
            }
        }
    });
}



//function OpenModalForDelete(Id) {
//    $("#deletedId").val(Id);
//    $('#deleteModalForm').modal('show');
//}



//$("#btnDelete").click(function () {
//    var parametre = {
//        Id: $("#deletedId").val(),
//    }
//    $.ajax({
//        type: "POST",
//        url: '/Panel/MainCategory/DeleteCategory',
//        dataType: "json",
//        data: JSON.stringify(parametre),
//        contentType: "application/json; charset=utf-8",
//        error: function () { alert("Hata") },
//        success: function (result) {
//            if (result == false) {
//                alertify.error("Silme işlemi gerçekleştirilemedi.")
//            }
//            else if (result == true) {
//                GetCategories();
//                alertify.success("Silme işlemi başarıyla gerçekleştirildi.")
//                $('#deleteModalForm').modal('hide');
//                $("#deletedId").val("");
//            }
//        }
//    });
//});






//<div class="alertify"><div class="dialog"><div><p class="msg">This is a confirm dialog</p><nav><button class="cancel" tabindex="2">Cancel</button><button class="ok" tabindex="1">Ok</button></nav></div></div></div>