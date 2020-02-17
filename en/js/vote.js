function generateCardCode() {
    var n = 30,
        i = 1;

    var contestant_id = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10', 'M11', 'M12', 'M13', 'M14'],
        contestant_name = ['POMPAM', 'NENE', 'GRACE', 'PUNPUN', 'MIMI', 'PRIM', 'MILD', 'BAM', 'BEST', 'WAM', 'GINNY', 'PATTY', 'MINT', 'JANE', 'MIU', 'DREAM', 'WOODY', 'YUHOO', 'DRAGON', 'JACKY', 'BOM', 'KIM', 'SAFEFY', 'GUSJAI', 'BOND', 'GUS', 'ICE', 'NET', 'PEAK', 'PAEAN'];
    for (i = 1; i <= n; i++) {
        var data = {
            link: '../contestants/' + contestant_id[i - 1] + ".html",
            id: contestant_id[i - 1],
            name: contestant_name[i - 1]
        }
        var template = ['<div class="container">',
            '<div class="select_button">',
            '<div class="round">',
            '<input class="checkbox" type="checkbox" id="{{id}}" value="{{id}}" />',
            '<label id="L{{id}}" for="{{id}}"></label>',
            '</div>',
            '</div>',
            '<div class="contestant picture {{id}}"></div>',
            '<a onclick=\'gotoPage("{{link}}",1)\'>',
            '<p>SEE MORE</p>',
            '</a>',
            '<p id="P{{id}}" class="name">{{id}} {{name}}</p>',
            '</div>'
        ].join("\n");
        var html = Mustache.render(template, data);
        $("#selector").append(html);
    }
}

function checkSelected(html_link, b) {
    if (!b) {
        ModalDisplay("Invalid");
        return 0;
    }
    if ($(":checkbox:checked").length != 3) {
        ModalDisplay("Please choose 3 FINALISTS");
    } else {
        var selectedContestant = [];
        var selectedContestantName = [];
        $('.container input[type="checkbox"]:checked').each(function() {
            var id = $(this).val();
            var name = $("#P" + id).html();
            selectedContestant.push(id);
            selectedContestantName.push(name);
        });
        var args = getQueryStringArgs();
        for (var i = 0; i < 3; i++) {
            args["con" + (i + 1)] = selectedContestant[i];
            args["con-name" + (i + 1)] = selectedContestantName[i];
        }
        window.location.href = html_link + createURL(args);
    }
}

function ConfirmStart() {
    var args = getQueryStringArgs();
    var i = 1,
        j = 1;
    $('.contestant').each(function() {
        $(this).addClass(args["con" + i++]);
    });
    $('.name').each(function() {
        this.innerHTML = args["con-name" + j++];
    });
}

function ConfirmVote(html_link, b) {
    if (!b) {
        ModalDisplay("Invalid");
        return 0;
    }
    var args = getQueryStringArgs();
    con1 = args["con1"]
    con2 = args["con2"]
    con3 = args["con3"]
    var person = {
        "stuID": args["studentid"],
        "projectName": "CUCL",
        "vote": [con1, con2, con3]
    };
    //TODO:
    var exp = $.post("https://asia-east2-cunex-vote-uat.cloudfunctions.net/api/vote", person);
    window.location.href = html_link + createURL(args);
}