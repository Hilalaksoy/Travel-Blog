$(document).ready(function () {
    GetAllSubCategories();
});


function GetSubCategories() {
    var parametre = {
        MainCategoryId: $("#ddMainCategoryId").val(),
    }
    $.ajax({
        type: "POST",
        url: '/Panel/SubCategory/GetSubCategories',
        contentType: "application/json, charset=uft-8",
        dataType: "json",
        data: JSON.stringify(parametre),
        error: function () {

        },
        success: function (result) {
            var content = "";
            for (var i = 0; i < result.length; i++) {
                content += "<tr>" +
                    "<td>" + result[i].Id + "</td>" +
                    "<td>" + result[i].MainCategoryDto.Title + "</td>" +
                    "<td>" + result[i].Title + "</td>" +
                    "<td>" + result[i].Summary + "</td>";
                if (result[i].IsActive == true) {
                    content += "<td>Aktif</td>";
                }
                else {
                    content += "<td>Pasif</td>";
                }
                content += "<td class='center'><a href='#' onclick='UpdateDetails(" + result[i].Id + ")' ><i class='ion-compose'></i></a></td>";
                content += "<td class='center'><a href='#' onclick='ModalForDelete(" + result[i].Id + ")' ><i class='ion-trash-a'></i></a></td>";
                content += "</tr>";

            }
            $("#tbody_list").html(content);

        }

    })
}

function GetAllSubCategories() {
    $.ajax({
        type: "POST",
        url: '/Panel/SubCategory/GetAllSubCategories',
        contentType: "application/json, charset=uft-8",
        dataType: "json",
        error: function () {

        },
        success: function (result) {
            var content = "";
            for (var i = 0; i < result.length; i++) {
                content += "<tr>" +
                    "<td>" + result[i].Id + "</td>" +
                    "<td>" + result[i].MainCategoryDto.Title + "</td>" +
                    "<td>" + result[i].Title + "</td>" +
                    "<td>" + result[i].Summary + "</td>";
                if (result[i].IsActive == true) {
                    content += "<td>Aktif</td>";
                }
                else {
                    content += "<td>Pasif</td>";
                }
                content += "<td class='center'><a href='#' onclick='UpdateDetails(" + result[i].Id + ")' ><i class='ion-compose'></i></a></td>";
                content += "<td class='center'><a href='#' onclick='ModalForDelete(" + result[i].Id + ")' ><i class='ion-trash-a'></i></a></td>";
                content += "</tr>";

            }
            $("#tbody_list").html(content);
        }

    })

}


function AddSubCategory() {
    var parameter = {
        Title: $("#txtTitle").val(),
        Summary: $("#txtSummary").val(),
        IsActive: $("#ddIsActive").val(),
        MainCategoryId: $("#mainCategoryId").val(),
    }
    $.ajax({
        type: "POST",
        url: '/Panel/SubCategory/AddSubCategory',
        dataType: "json",
        data: JSON.stringify(parameter),
        contentType: "application/json; charset=utf-8",
        error: function () {
            alertify.error("Kategori ekleme sırasında bir hata oluştu!");
            $("#exampleModalform > button").click();
        },
        success: function (result) {
            if (result == false) {
                alertify.error("Kategori ekleme esnasında bir hata oluştu");
            }
            else {
                alertify.success("Kategori eklendi!")
                GetAllSubCategories();
            }
            $("#txtTitle").val("");
            $("#txtSummary").val("");
            $('#exampleModalForm').modal('toggle')
        }
    });
}


function UpdateDetails(Id) {
    var parameter = {
        Id: Id
    }
    $.ajax({
        type: "POST",
        url: '/Panel/SubCategory/CategoryDetails',
        dataType: "json",
        data: JSON.stringify(parameter),
        contentType: "application/json; charset=utf-8",
        error: function () {
            alertify.error("Kategori güncelleme esnasında bir hata oluştu!");
            $("#modal_Duzenle > button").click();
        },
        success: function (result) {
            $("#subCategoryId").val(result.Id);
            $("#mainCategoryId").val(result.MainCategoryDto.Id);
            $("#txtUpdateMainCategoryName").val(result.MainCategoryDto.Title);
            $("#txtUpdateCategoryName").val(result.Title);
            $("#txtUpdateDescription").val(result.Summary);
            $("#ddUpdateIsActive").val(result.IsActive.toString());
            $('#updateModalForm').modal('toggle')

        }
    });
}


function Update() {
    var formdata = new FormData();

    formdata.append("Id", $("#subCategoryId").val());
    formdata.append("MainCategoryId", $("#mainCategoryId").val());
    formdata.append("MainCategoryDto.Title", $("#txtUpdateMainCategoryName").val());
    formdata.append("Title", $("#txtUpdateCategoryName").val());
    formdata.append("Summary", $("#txtUpdateDescription").val());
    formdata.append("IsActive", $("#ddUpdateIsActive").val());

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/Panel/SubCategory/UpdateCategory');
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var result = JSON.parse(xhr.responseText);
            if (result == true) {
                GetAllSubCategories();
                $('#updateModalForm').modal('toggle');
                alertify.success("Kategori başarıyla güncellendi!");
            }
            else if (result == false) {
                alertify.error("Kategori güncelleme esnasında bir hata oluştu!");
            }
            return true;
        }
        else {
            alertify.error("Kategori güncelleme esnasında bir hata oluştu!");
            return false;
        }
    }


}



function ModalForDelete(Id) {
    alertify.confirm("Silmek istediğinize emin misiniz?", function (ev) {
        ev.preventDefault();
        DeleteCategory(Id);
    }, function (ev) {
        ev.preventDefault();
    });

}

function DeleteCategory(Id) {
    var parameter = {
        Id: Id
    }
    $.ajax({
        type: "POST",
        url: '/Panel/SubCategory/DeleteCategory',
        dataType: "json",
        data: JSON.stringify(parameter),
        contentType: "application/json; charset=utf-8",
        error: function () {
            alertify.error("Kategori silme işlemi sırasında bir hata oluştu");
        },
        success: function (result) {
            if (result == false) {
                alertify.error("Kategori silme işlemi sırasında bir hata oluştu");
            }
            else {
                GetAllSubCategories();
                alertify.success("Kategori başarıyla silindi");
            }
        }
    });
}



