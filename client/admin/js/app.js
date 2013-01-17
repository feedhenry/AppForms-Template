var editor; // use a global for the submit and return data rendering in the examples
var entityTable;

$fh.ready(function () {
  $(document).ready(function() {
    entityTable = $('#entityTable');

    $('#go').on('click', function (e) {
      e.preventDefault();
      var schema = $('#schema').val().split(',');
      var entityName = $('#entityName').val();
      var editorFields = [];
      var aoColumns = [];

      for (var si = 0, sl = schema.length; si < sl; si += 1) {
        editorFields.push({
          "label": schema[si],
          "name": schema[si],
          "type": "text"
        });

        aoColumns.push({
          mData: schema[si],
          sTitle: schema[si]
        });
      }

      aoColumns.push({
        "mDataProp": null,
        "sClass": "center omit",
        "sDefaultContent": '<a href="" class="editor_view">View</a> / <a href="" class="editor_edit">Edit</a> / <a href="" class="editor_remove">Delete</a>'
      });

      editor = new $.fn.dataTable.Editor( {
        "ajaxUrl": '', // doesn't matter what this is, we're using fh.act
        "ajax": function (method, url, data, successCallback, errorCallback) {
          data.entity = entityName;
          $fh.act({
            "act": "db",
            "req": data
          }, function (res) {
            successCallback(res);
          }, function (msg, err) {
            errorCallback(null, msg, null);
          });
        },
        "domTable": "#entityTable",
        "fields": editorFields
      });

      // fix for fields container height (max-height is too small)
      editor.on('onOpen', function (e) {
        $('.DTE_Body_Content').removeAttr('style');
      });

      // View record
      entityTable.on('click', 'a.editor_view,tr td:not(.omit)', function (e) {
        e.preventDefault();
        var row = $(this).parents('tr')[0];
        var data = entityTable.fnGetData(row);

        var win = window.open();
        $(win.document.body).html('<h3>' + data.id + ' (' + new Date(data.timestamp).toUTCString() + ')</h3><pre>' + data.logs + '</pre>');
      });

      // Edit record
      entityTable.on('click', 'a.editor_edit', function (e) {
        e.preventDefault();

        editor.edit( $(this).parents('tr')[0], 'Edit record', {
          "label": "Update",
          fn: function () {
            editor.submit();
          }
        });
      });

      // Delete a record (without asking a user for confirmation)
      entityTable.on('click', 'a.editor_remove', function (e) {
        e.preventDefault();

        editor.remove( $(this).parents('tr')[0], '', false, false );
        editor.submit();
      });
              
      entityTable.dataTable( {
        bDestroy: true,
        "sDom": "<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
        "sAjaxSource": '', // doesn't matter, using fh.act
        "fnServerData": function ( sSource, aoData, fnCallback, oSettings ) {
          $fh.act({
            "act": "db",
            "req": {
              "action": "list",
              "aoData": aoData,
              "entity": entityName
            }
          }, function (res) {
            fnCallback(res);
          }, function (msg, err) {
            fnCallback({
              aaData: []
            });
            $fh.logger.warn('ERROR GETTING DATA FROM SERVER (9100): msg=' + msg + ', err=' + JSON.stringify(err));
          });
        },
        "aoColumns": aoColumns,
        "oTableTools": {
            "aButtons": [
                { "sExtends": "editor_create", "editor": editor }
            ]
        }
      });
    });
  });
});