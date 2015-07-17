function encodeKeyword(rawKeyword) {
    var blackList = [{'regex': /C#/gi, 'replace': 'C_sharp'}, {
        'regex': /C\+\+/gi,
        'replace': 'C_plus_plus'
    }, {'regex': /[\[\]\\\/:~\^\?!()&><"'@%|{}`*#]/gi, 'replace': ' '}], regex, tempkeyword;
    for (var i in blackList) {
        rawKeyword = rawKeyword.replace(blackList[i].regex, blackList[i].replace);
    }
    do {
        tempkeyword = rawKeyword;
        rawKeyword = tempkeyword.replace("  ", " ")
    } while (tempkeyword != rawKeyword);
    rawKeyword = jQuery.trim(rawKeyword);
    return rawKeyword.replace(/ /g, '-');
}

function createKeyword(e) {
    e = $.trim(e);
    e = e.replace(/[\[\]\/\:\~\^?!()+#&><"'%]/gi, "");
    do {
        tempkeyword = e;
        e = tempkeyword.replace("  ", " ")
    } while (tempkeyword != e);
    e = e.replace(/ /g, "-");
    return e
}
function locdau(e) {
    e = e.toLowerCase();
    e = e.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    e = e.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    e = e.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    e = e.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    e = e.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    e = e.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    e = e.replace(/đ/g, "d");
    e = e.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    e = e.replace(/-+-/g, "-");
    e = e.replace(/^\-+|\-+$/g, "");
    return e
}
function getVietnamWorksUrl() {
    var e = "http://www.vietnamworks.com/";
    var language = 1;

    var t = VietnamWorksJobAlert.settings.get('keyword'),
        cateList = VietnamWorksJobAlert.settings.get('category'),
        locList = VietnamWorksJobAlert.settings.get('location'),
        l = VietnamWorksJobAlert.settings.get('jobLevel'),
        s = VietnamWorksJobAlert.settings.get('salary');

    l = (l != null  && l != "0") ? l : null;
    var n = (cateList != null && cateList != "0") ? parseInt(cateList) : null,
        r = (locList != null  && locList != "0") ? parseInt(locList) : null,
        i = 0;

    console.log('******');
    console.log(locList);
    console.log(r);
    console.log('******');


    var categoryFriendly = locationFriendly = '';
    var advancedSearch = jobLevelFriendly = salaryFriendly = "";
    if (l && l != -1) {
        advancedSearch = "l" + l;
        if (language == 1) {
            jobLevelFriendly = aJobLevel[l];
        } else {
            jobLevelFriendly = aJobLevelEn[l];
        }
    }
    if (s.match(/^(([1-9][0-9]{0,2}((,|\.)?[0-9]{3})*)|0)?$/)) {
        s = s.replace(/(,|\.)/g, '');
    } else {
        s = '';
    }
    if (s) {
        advancedSearch += "s" + s;
        if (language == 1) {
            salaryFriendly = 'viec-lam-voi-muc-luong-tu-' + s + '-usd';
        } else {
            salaryFriendly = 'job-with-salary-of-' + s + '-usd';
        }
    }
    if (language == 1) {
        if (cateList != null) {
            lengthCateList = cateList.length;
        } else {
            lengthCateList = 0;
        }
        for (var ci = 0; ci < lengthCateList; ci++) {
            var cateListId = cateList[ci];
            categoryFriendly += aCategoryVn[cateListId] + '-';
        }
        categoryFriendly = categoryFriendly.substr(0, categoryFriendly.length - 1);
        if (locList != null) {
            lengthLocList = locList.length;
        } else {
            lengthLocList = 0;
        }

        locationFriendly += aLocation[locList] + '-';

        locationFriendly = locationFriendly.substr(0, locationFriendly.length - 1);
        if (t && t != "Nhập Chức Danh, Vị Trí Công Việc, Kỹ Năng Liên Quan...") {
            e += "" + encodeKeyword(t);
            endlink = "-vn";
            i++;
            if (n && !r) {
                e += "+nganh-" + categoryFriendly + "-i" + n + advancedSearch + endlink
            } else if (n && r) {
                e += "+tai-" + locationFriendly + "-i" + n + "v" + r + advancedSearch + endlink
            } else if (!n && r) {
                e += "+tai-" + locationFriendly + "-v" + r + advancedSearch + endlink
            } else {
                if (advancedSearch) {
                    e += "+viec-lam-" + advancedSearch + endlink;
                } else {
                    e += "-kv"
                }
            }
        } else {
            endlink = "-vn";
            if (n && !r) {
                e += "viec-lam-" + categoryFriendly + "-i" + n + advancedSearch + endlink;
                i++
            } else if (n && r) {
                e += "viec-lam-" + categoryFriendly + "-tai-" + aLocation[locList[0]] + "-i" + n + "v" + r + advancedSearch + endlink;
                i++
            } else if (!n && r) {
                e += "viec-lam-tai-" + locationFriendly + "-v" + r + advancedSearch + endlink;
                i++
            } else {
                if (advancedSearch) {
                    if (jobLevelFriendly != '') {
                        e += jobLevelFriendly;
                    } else {
                        e += salaryFriendly;
                    }
                    e += "-" + advancedSearch + endlink;
                    i++
                } else {
                    i = 0;
                }
            }
        }
    } else {
        if (cateList != null) {
            lengthCateList = cateList.length;
        } else {
            lengthCateList = 0;
        }
        for (var ci = 0; ci < lengthCateList; ci++) {
            var cateListId = cateList[ci];
            categoryFriendly += aCategoryEn[cateListId] + '-';
        }
        categoryFriendly = categoryFriendly.substr(0, categoryFriendly.length - 1);
        if (locList != null) {
            lengthLocList = 1;
        } else {
            lengthLocList = 0;
        }
        for (var ci = 0; ci < lengthLocList; ci++) {
            var locListId = locList[ci];
            locationFriendly += aLocationEn[locListId] + '-';
        }
        locationFriendly = locationFriendly.substr(0, locationFriendly.length - 1);
        if (t && t != "Enter job title, position, relevant skills,...") {
            e += "" + encodeKeyword(t);
            endlink = "-en";
            i++;
            if (n && !r) {
                e += "+at-" + categoryFriendly + "-i" + n + advancedSearch + endlink
            } else if (n && r) {
                e += "+in-" + locationFriendly + "-i" + n + "v" + r + advancedSearch + endlink
            } else if (!n && r) {
                e += "+in-" + locationFriendly + "-v" + r + advancedSearch + endlink
            } else {
                if (advancedSearch) {
                    e += "+jobs-" + advancedSearch + endlink;
                } else {
                    e += "-kw"
                }
            }
        } else {
            endlink = "-en";
            if (n && !r) {
                e += "" + categoryFriendly + "-jobs-i" + n + advancedSearch + endlink;
                i++
            } else if (n && r) {
                e += "" + categoryFriendly + "-jobs-in-" + aLocationEn[locList[0]] + "-i" + n + "v" + r + advancedSearch + endlink;
                i++
            } else if (!n && r) {
                e += "" + locationFriendly + "-jobs-v" + r + advancedSearch + endlink;
                i++
            } else {
                if (advancedSearch) {
                    if (advancedSearch) {
                        if (jobLevelFriendly != '') {
                            e += jobLevelFriendly;
                        } else {
                            e += salaryFriendly;
                        }
                        e += "-" + advancedSearch + endlink;
                        i++
                    } else {
                        i = 0;
                    }
                } else {
                    i = 0;
                }
            }
        }
    }
    if (i == 0) {
        if (language == 1) {
            e += "tim-viec-lam/tat-ca-viec-lam"
        } else {
            e += "job-search/all-jobs"
        }
    }
    return e;
}
var z_index = 500;
$('.multiple-select').find('*').each(function () {
    $(this).css('zIndex', z_index);
    z_index -= 1;
});
var aJobLevel = new Array;
aJobLevel[1] = "moi-tot-nghiep-thuc-tap-sinh";
aJobLevel[5] = "nhan-vien";
aJobLevel[6] = "truong-nhom-giam-sat";
aJobLevel[7] = "truong-phong";
aJobLevel[11] = "truong-phong-luong-tren-1000";
aJobLevel[3] = "giam-doc";
aJobLevel[4] = "tong-giam-doc-dieu-hanh";
aJobLevel[8] = "pho-chu-tich";
aJobLevel[9] = "chu-tich";
aJobLevel[10] = "pho-giam-doc";
var aJobLevelEn = new Array;
aJobLevelEn[1] = "new-grad-entry-level-internship";
aJobLevelEn[5] = "experienced-non-manager";
aJobLevelEn[6] = "team-leader-supervisor";
aJobLevelEn[7] = "manager";
aJobLevelEn[11] = "manager-salary-from-1000";
aJobLevelEn[3] = "director";
aJobLevelEn[4] = "ceo";
aJobLevelEn[8] = "vice-president";
aJobLevelEn[9] = "president";
aJobLevelEn[10] = "vice-director";
var aLocation = new Array;
aLocation[29] = "ho-chi-minh";
aLocation[24] = "ha-noi";
aLocation[71] = "dbscl";
aLocation[2] = "an-giang";
aLocation[3] = "ba-ria";
aLocation[4] = "bac-can";
aLocation[5] = "bac-giang";
aLocation[6] = "bac-lieu";
aLocation[7] = "bac-ninh";
aLocation[8] = "ben-tre";
aLocation[9] = "bien-hoa";
aLocation[10] = "binh-dinh";
aLocation[11] = "binh-duong";
aLocation[12] = "binh-phuoc";
aLocation[13] = "binh-thuan";
aLocation[14] = "ca-mau";
aLocation[15] = "can-tho";
aLocation[16] = "cao-bang";
aLocation[17] = "da-nang";
aLocation[18] = "dac-lac";
aLocation[69] = "dien-bien";
aLocation[19] = "dong-nai";
aLocation[20] = "dong-thap";
aLocation[21] = "gia-lai";
aLocation[22] = "ha-giang";
aLocation[23] = "ha-nam";
aLocation[25] = "ha-tay";
aLocation[26] = "ha-tinh";
aLocation[27] = "hai-duong";
aLocation[28] = "hai-phong";
aLocation[30] = "hoa-binh";
aLocation[31] = "hue";
aLocation[32] = "hung-yen";
aLocation[33] = "khanh-hoa";
aLocation[34] = "kon-tum";
aLocation[35] = "lai-chau";
aLocation[36] = "lam-dong";
aLocation[37] = "lang-son";
aLocation[38] = "lao-cai";
aLocation[39] = "long-an";
aLocation[40] = "nam-dinh";
aLocation[41] = "nghe-an";
aLocation[42] = "ninh-binh";
aLocation[43] = "ninh-thuan";
aLocation[44] = "phu-tho";
aLocation[45] = "phu-yen";
aLocation[46] = "quang-binh";
aLocation[47] = "quang-nam";
aLocation[48] = "quang-ngai";
aLocation[49] = "quang-ninh";
aLocation[50] = "quang-tri";
aLocation[51] = "soc-trang";
aLocation[52] = "son-la";
aLocation[53] = "tay-ninh";
aLocation[54] = "thai-binh";
aLocation[55] = "thai-nguyen";
aLocation[56] = "thanh-hoa";
aLocation[57] = "thua-thienhue";
aLocation[58] = "tien-giang";
aLocation[59] = "tra-vinh";
aLocation[60] = "tuyen-quang";
aLocation[61] = "kien-giang";
aLocation[62] = "vinh-long";
aLocation[63] = "vinh-phuc";
aLocation[64] = "vung-tau";
aLocation[65] = "yen-bai";
aLocation[66] = "khac";
aLocation[70] = "quoc-te";
aLocation[72] = "hau-giang";
var aLocationEn = new Array;
aLocationEn[29] = "ho-chi-minh";
aLocationEn[24] = "ha-noi";
aLocationEn[71] = "mekong-delta";
aLocationEn[2] = "an-giang";
aLocationEn[3] = "ba-ria-vung-tau";
aLocationEn[4] = "bac-can";
aLocationEn[5] = "bac-giang";
aLocationEn[6] = "bac-lieu";
aLocationEn[7] = "bac-ninh";
aLocationEn[8] = "ben-tre";
aLocationEn[9] = "bien-hoa";
aLocationEn[10] = "binh-dinh";
aLocationEn[11] = "binh-duong";
aLocationEn[12] = "binh-phuoc";
aLocationEn[13] = "binh-thuan";
aLocationEn[14] = "ca-mau";
aLocationEn[15] = "can-tho";
aLocationEn[16] = "cao-bang";
aLocationEn[17] = "da-nang";
aLocationEn[18] = "dac-lac";
aLocationEn[69] = "dien-bien";
aLocationEn[19] = "dong-nai";
aLocationEn[20] = "dong-thap";
aLocationEn[21] = "gia-lai";
aLocationEn[22] = "ha-giang";
aLocationEn[23] = "ha-nam";
aLocationEn[25] = "ha-tay";
aLocationEn[26] = "ha-tinh";
aLocationEn[27] = "hai-duong";
aLocationEn[28] = "hai-phong";
aLocationEn[30] = "hoa-binh";
aLocationEn[31] = "hue";
aLocationEn[32] = "hung-yen";
aLocationEn[33] = "khanh-hoa";
aLocationEn[34] = "kon-tum";
aLocationEn[35] = "lai-chau";
aLocationEn[36] = "lam-dong";
aLocationEn[37] = "lang-son";
aLocationEn[38] = "lao-cai";
aLocationEn[39] = "long-an";
aLocationEn[40] = "nam-dinh";
aLocationEn[41] = "nghe-an";
aLocationEn[42] = "ninh-binh";
aLocationEn[43] = "ninh-thuan";
aLocationEn[44] = "phu-tho";
aLocationEn[45] = "phu-yen";
aLocationEn[46] = "quang-binh";
aLocationEn[47] = "quang-nam";
aLocationEn[48] = "quang-ngai";
aLocationEn[49] = "quang-ninh";
aLocationEn[50] = "quang-tri";
aLocationEn[51] = "soc-trang";
aLocationEn[52] = "son-la";
aLocationEn[53] = "tay-ninh";
aLocationEn[54] = "thai-binh";
aLocationEn[55] = "thai-nguyen";
aLocationEn[56] = "thanh-hoa";
aLocationEn[57] = "thua-thien-hue";
aLocationEn[58] = "tien-giang";
aLocationEn[59] = "tra-vinh";
aLocationEn[60] = "tuyen-quang";
aLocationEn[61] = "kien-giang";
aLocationEn[62] = "vinh-long";
aLocationEn[63] = "vinh-phuc";
aLocationEn[64] = "vung-tau";
aLocationEn[65] = "yen-bai";
aLocationEn[66] = "orther";
aLocationEn[70] = "international";
aLocationEn[72] = "hau-giang";
var aCategoryVn = new Array;
aCategoryVn[1] = "ke-toan-tai-chinh";
aCategoryVn[2] = "hanh-chanh-thu-ky";
aCategoryVn[3] = "quang-cao-khuyen-mai-doi-ngoai";
aCategoryVn[4] = "nong-nghiep-lam-nghiep";
aCategoryVn[5] = "kien-truc-thiet-ke-noi-that";
aCategoryVn[6] = "duoc-pham-cong-nghe-sinh-hoc";
aCategoryVn[7] = "xay-dung";
aCategoryVn[8] = "tu-van";
aCategoryVn[10] = "my-thuat-thiet-ke";
aCategoryVn[11] = "dich-vu-khach-hang";
aCategoryVn[12] = "giao-duc-dao-tao";
aCategoryVn[13] = "ky-thuat-ung-dung";
aCategoryVn[15] = "moi-tot-nghiep";
aCategoryVn[16] = "moi-truong-xu-ly-chat-thai";
aCategoryVn[17] = "cap-quan-ly-dieu-hanh";
aCategoryVn[18] = "nguoi-nuoc-ngoai-viet-kieu";
aCategoryVn[19] = "xuat-nhap-khau";
aCategoryVn[21] = "phi-chinh-phu-phi-loi-nhuan";
aCategoryVn[22] = "y-te-cham-soc-suc-khoe";
aCategoryVn[23] = "nhan-su";
aCategoryVn[24] = "bao-hiem";
aCategoryVn[25] = "phap-ly";
aCategoryVn[26] = "san-xuat";
aCategoryVn[27] = "marketing";
aCategoryVn[28] = "dau-khi";
aCategoryVn[30] = "bat-dong-san";
aCategoryVn[32] = "ban-le-ban-si";
aCategoryVn[33] = "ban-hang";
aCategoryVn[34] = "ban-hang-ky-thuat";
aCategoryVn[35] = "it-phan-mem";
aCategoryVn[36] = "van-chuyen-giao-nhan";
aCategoryVn[37] = "hang-khong-du-lich-khach-san";
aCategoryVn[39] = "khac";
aCategoryVn[41] = "vien-thong";
aCategoryVn[42] = "ngan-hang";
aCategoryVn[43] = "hoa-hoc-hoa-sinh";
aCategoryVn[47] = "bien-phien-dich";
aCategoryVn[48] = "truyen-hinh-truyen-thong-bao-chi";
aCategoryVn[49] = "vat-tu-cung-van";
aCategoryVn[51] = "thoi-vu-hop-dong-ngan-han";
aCategoryVn[52] = "det-may-da-giay";
aCategoryVn[53] = "kho-van";
aCategoryVn[54] = "thuc-pham-do-uong";
aCategoryVn[55] = "it-phan-cung-mang";
aCategoryVn[56] = "chung-khoan";
aCategoryVn[57] = "internet-online-media";
aCategoryVn[58] = "ke-toan-kiem-toan";
aCategoryVn[59] = "tai-chinh-dau-tu";
aCategoryVn[60] = "thuc-pham";
aCategoryVn[61] = "hang-gia-dung-cham-soc-ca-nhan";
aCategoryVn[62] = "hang-cao-cap";
aCategoryVn[63] = "thoi-trang-lifestyle";
aCategoryVn[64] = "dien-dien-tu";
aCategoryVn[65] = "co-khi";
aCategoryVn[66] = "cong-nghe-cao";
aCategoryVn[67] = "o-to";
aCategoryVn[68] = "san-pham-cong-nghiep";
aCategoryVn[69] = "hoach-dinh-du-an";
aCategoryVn[70] = "qa-qc";
aCategoryVn[71] = "overseas-jobs";
var aCategoryEn = new Array;
aCategoryEn[1] = "accounting-finance";
aCategoryEn[2] = "administrative-clerical";
aCategoryEn[3] = "advertising-promotion-pr";
aCategoryEn[4] = "agriculture-forestry";
aCategoryEn[5] = "architecture-interior-design";
aCategoryEn[6] = "pharmaceutical-biotech";
aCategoryEn[7] = "civil-construction";
aCategoryEn[8] = "consulting";
aCategoryEn[10] = "arts-design";
aCategoryEn[11] = "customer-service";
aCategoryEn[12] = "education-training";
aCategoryEn[13] = "engineering";
aCategoryEn[15] = "entry-level";
aCategoryEn[16] = "environment-waste-services";
aCategoryEn[17] = "executive-management";
aCategoryEn[18] = "expatriate-jobs-in-vietnam";
aCategoryEn[19] = "export-import";
aCategoryEn[21] = "ngo-non-profit";
aCategoryEn[22] = "health-medical-care";
aCategoryEn[23] = "human-resources";
aCategoryEn[24] = "insurance";
aCategoryEn[25] = "legal-contracts";
aCategoryEn[26] = "production-process";
aCategoryEn[27] = "marketing";
aCategoryEn[28] = "oil-gas";
aCategoryEn[30] = "real-estate";
aCategoryEn[32] = "retail-wholesale";
aCategoryEn[33] = "sales";
aCategoryEn[34] = "sales-technical";
aCategoryEn[35] = "it-software";
aCategoryEn[36] = "freight-logistics";
aCategoryEn[37] = "airlines-tourism-hotel";
aCategoryEn[39] = "other";
aCategoryEn[41] = "telecommunications";
aCategoryEn[42] = "banking";
aCategoryEn[43] = "chemical-biochemical";
aCategoryEn[47] = "interpreter-translator";
aCategoryEn[48] = "tv-media-newspaper";
aCategoryEn[49] = "purchasing-supply-chain";
aCategoryEn[51] = "temporary-contract";
aCategoryEn[52] = "textiles-garments-footwear";
aCategoryEn[53] = "warehouse";
aCategoryEn[54] = "food-beverage";
aCategoryEn[55] = "it-hardware-networking";
aCategoryEn[56] = "securities-trading";
aCategoryEn[57] = "internet-online-media";
aCategoryEn[58] = "accounting-auditing";
aCategoryEn[59] = "finance-investment";
aCategoryEn[60] = "food";
aCategoryEn[61] = "household-personal-care";
aCategoryEn[62] = "luxury-goods";
aCategoryEn[63] = "fashion-lifestyle";
aCategoryEn[64] = "electrical-electronics";
aCategoryEn[65] = "mechanical";
aCategoryEn[66] = "high-technology";
aCategoryEn[67] = "automotive";
aCategoryEn[68] = "industrial-products";
aCategoryEn[69] = "planning-projects";
aCategoryEn[70] = "qa-qc";
aCategoryEn[71] = "overseas-jobs"
