var filter_term = '',
filter_startswith = '',
filter_relatedto = '',
filter_rhymeswith = '',
filter_soundslike = '',
filter_vowelslike = '',
filter_stresspattern = '',
filter_numberofletters = '',
filter_numberofsyllables = '',
requested_lang = '',
full_api_query = '',
panelToStartIndex = [
],
alphabetized = !1,
selected_res = null,
COLORS = {
  blue: 'lightblue',
  pink: 'pink',
  red: 'red',
  green: 'lightgreen',
  yellow: 'yellow',
  brown: 'brown',
  orange: 'orange',
  purple: 'purple',
  gold: 'gold',
  blue: 'lightblue'
},
MAX_TOPDEF_LENGTH_CHARS = 250,
STRESS_PATTERNS = '/ /x x/ // /xx x/x xx/ /xxx x/xx xx/x xxx/'.split(' '),
SYLLABLE_COUNTS = '123456789'.split(''),
VOWEL_SOUND_PROTOTYPES = 'a (as in ball);a (as in bat);a (as in bay);e (as in bet);e (as in bee);i (as in bit);i (as in bite);o (as in bob);o (as in boat);oo (as in book);oo (as in boo);ou (as in bout);oy (as in boy);er (as in burr);u (as in but)'.split(';'),
resultData = [
];
function getUrlVars() {
  for (var a = [
  ], b = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'), c = 0; c < b.length; c++) {
    var e = b[c].split('=');
    a.push(e[0]);
    a[e[0]] = decodeURIComponent(e[1])
  }
  return a
}
function is_touch_device() {
  return 'ontouchstart' in window || 0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints
}
function showOrHideFilters() {
  var a = areFiltersActive(),
  b = filtersAreOpen();
  (a && !b || !a && b) && toggleFilters()
}
function clickVowelTeaser() {
  filtersAreOpen() || toggleFilters();
  $('#filter_vowelslike').autocomplete('search', '')
}
function thesInit(a) {
  var b = getUrlVars();
  a = b[a];
  var c = $('#thesinput');
  clearFilters();
  'undefined' != typeof a && (filter_term = a.replace(/[+]/gm, ' ').replace(/[<>=?]/gm, ''), 'undefined' != typeof b.f_sw && (filter_startswith = b.f_sw), 'undefined' != typeof b.f_sl && (filter_soundslike = b.f_sl), 'undefined' != typeof b.f_vl && (filter_vowelslike = b.f_vl), 'undefined' != typeof b.f_nl && (filter_numberofletters = b.f_nl), 'undefined' != typeof b.lang && (requested_lang = b.lang), 'undefined' != typeof b.f_ns && (filter_numberofsyllables = b.f_ns), 'undefined' != typeof b.f_rw && (filter_rhymeswith = b.f_rw), 'undefined' != typeof b.f_stress && (filter_stresspattern = b.f_stress), 'undefined' != typeof b.f_rt && (filter_relatedto = b.f_rt), 0 < c.length && (c.val(filter_term), document.title = makeTitle(filter_term), c[0].focus()), lookup(), setFilters(), showOrHideFilters());
  '' === $('#helpline1').val() && 'undefined' === typeof THESAURUS_SUPPRESS_BASE_HELPLINE && setHelpline('<i>Enter a word, phrase, sentence, or pattern above to search for related words.</i>');
  $('#tabs').hide();
  $('#info').show();
  $('body').click(globalOnclick)
}
function showdoc() {
  $('#info').show();
  for (var a = 0; 5 > a; a++) $('#zone' + a.toString()).html('');
  $('#heading1').html('');
  $('#heading2').html('')
}
function makeTitle(a) {
  return a + ': OneLook thesaurus'
}
function rerankStr(a, b) {
  return '<button onClick="rerank_' + a + '();">' + b + '</button>'
}
function rerank_alphabetize() {
  alphabetized = !0;
  panelToStartIndex = [
  ];
  layoutResults(0)
}
function rerank_relevance() {
  alphabetized = !1;
  panelToStartIndex = [
  ];
  layoutResults(0);
  $('#rerank').html(rerankStr('alphabetize', locText(ALPHABETIZE)))
}
function click_meter_filter(a) {
  filt_meter(a);
  showOrHideFilters();
  inputBlur($('#filter_stresspattern') [0], 'Meter')
}
function addFilterHiddenParam(a, b, c) {
  var e = $('#form1');
  if ('undefined' != typeof e) {
    var l = $('#rzform_filt_' + a);
    'undefined' != typeof l && l.remove();
    '' !== c && e.append('<input id="rzform_filt_' + a + '" type="hidden" name="' + b + '" value="' + c + '">')
  }
}
function filt_meter(a) {
  filter_stresspattern = a;
  filter_numberofsyllables = '';
  clearFilter('numberofsyllables', 'Num. syllables');
  filter_soundslike = '';
  clearFilter('soundslike', 'Sounds like');
  filter_vowelslike = '';
  clearFilter('vowelslike', 'Primary vowel');
  $('#filter_stresspattern').val(filter_stresspattern);
  getResults(!1)
}
function filt_sylcount(a) {
  filter_numberofsyllables = a;
  filter_soundslike = '';
  clearFilter('soundslike', 'Sounds like');
  filter_vowelslike = '';
  clearFilter('vowelslike', 'Primary vowel');
  filter_stresspattern = '';
  clearFilter('stresspattern', 'Stress');
  getResults(!1)
}
function filt_vowels(a) {
  filter_vowelslike = a;
  filter_soundslike = '';
  clearFilter('soundslike', 'Sounds like');
  filter_numberofsyllables = '';
  clearFilter('numberofsyllables', 'Num. syllables');
  filter_stresspattern = '';
  clearFilter('stresspattern', 'Stress');
  getResults(!1)
}
function makeCurrentUrl(a) {
  urlPath = '?s=' + encodeURIComponent(filter_term);
  '' !== filter_startswith && (urlPath += '&f_sw=' + encodeURIComponent(filter_startswith));
  null !== a ? urlPath += '&f_rt=' + encodeURIComponent(a)  : '' !== filter_relatedto && (urlPath += '&f_rt=' + encodeURIComponent(filter_relatedto));
  '' !== filter_rhymeswith && (urlPath += '&f_rw=' + encodeURIComponent(filter_rhymeswith));
  '' !== filter_soundslike && (urlPath += '&f_sl=' + encodeURIComponent(filter_soundslike));
  '' !== filter_vowelslike && (urlPath += '&f_vl=' + encodeURIComponent(filter_vowelslike));
  '' !== filter_stresspattern && (urlPath += '&f_stress=' + encodeURIComponent(filter_stresspattern));
  '' !== filter_numberofletters && (urlPath += '&f_nl=' + encodeURIComponent(filter_numberofletters));
  '' !== filter_numberofsyllables && (urlPath += '&f_ns=' + encodeURIComponent(filter_numberofsyllables));
  return urlPath
}
function saveWindowState(a) {
  var b = makeTitle(filter_term),
  c = makeCurrentUrl(null);
  a && window.history && window.history.pushState ? window.history.pushState({
  }, b, c)  : window.history && window.history.replaceState ? window.history.replaceState({
  }, b, c)  : window.location.hash = c;
  document.title = b
}
function setHelpline(a) {
  var b = $('#helpline1');
  0 < b.length && b.html(a)
}
function areFiltersActive() {
  return '' !== filter_startswith || '' !== filter_relatedto || '' !== filter_rhymeswith || '' !== filter_soundslike || '' !== filter_vowelslike || '' !== filter_numberofsyllables || '' !== filter_stresspattern || '' !== filter_numberofletters
}
function setBaseHelpline() {
  if ('undefined' != typeof THESAURUS_SUPPRESS_BASE_HELPLINE) 'Searching...' === $('#helpline1').text() && setHelpline(' ');
   else {
    var a = 'Showing words';
    areFiltersActive() && (a = 'Showing filtered words');
    if ('' !== filter_term) if (hasWildcard(filter_term)) {
      var b = alphabetized ? 'alphabetically' : 'by popularity';
      setHelpline('<i>' + a + ' matching the pattern <b>' + filter_term + '</b>, ranked ' + b + '.</i>')
    } else {
      var c = '<b>' + filter_term + '</b>';
      '' !== filter_relatedto ? (b = alphabetized ? 'alphabetically' : 'by similarity to <b>' +
      filter_relatedto + '</b>', setHelpline('<i>' + a + ' related to ' + c + ', ranked ' + b + '</b>.</i>'))  : (b = alphabetized ? 'alphabetically' : 'by relevance', setHelpline('<i>' + a + ' related to ' + c + ', ranked ' + b + '.</i>'))
    } else areFiltersActive() && (b = alphabetized ? 'alphabetically' : 'by popularity', setHelpline('<i>' + a + ', ranked ' + b + '.</i>'))
  }
}
function prevMouseOver() {
}
function firstPageMouseOver() {
}
function nextMouseOver() {
}
function resMouseOver(a) {
  setHelpline('<i>Click to see definitions of this word and more info.</i>')
}
function clearFilter(a, b) {
  var c = $('#filter_' + a);
  c.val('');
  inputBlur(c[0], b)
}
function hasWildcard(a) {
  return - 1 != a.indexOf('*') || - 1 != a.indexOf('@') || - 1 != a.indexOf('#') || - 1 < a.indexOf('?') && a.indexOf('?') < a.length - 1
}
function currentQueryHasWildcard() {
  return hasWildcard(filter_term) || '' === filter_term
}
function setFilter(a, b, c) {
  a = $('#filter_' + a);
  a.val(c);
  inputBlur(a[0], b)
}
function setFilters() {
  setFilter('startswith', 'Starts with', filter_startswith);
  setFilter('soundslike', 'Sounds like', filter_soundslike);
  setFilter('vowelslike', 'Primary vowel', filter_vowelslike);
  setFilter('stresspattern', 'Meter', filter_stresspattern);
  setFilter('numberofletters', 'Letters', filter_numberofletters);
  setFilter('numberofsyllables', 'Syllables', filter_numberofsyllables);
  setFilter('rhymeswith', 'Rhymes with', filter_rhymeswith);
  setFilter('relatedto', 'Related to', filter_relatedto)
}
function addFilterHiddenParams() {
  addFilterHiddenParam('startswith', 'f_sw', filter_startswith);
  addFilterHiddenParam('soundslike', 'f_sl', filter_soundslike);
  addFilterHiddenParam('vowelslike', 'f_vl', filter_vowelslike);
  addFilterHiddenParam('stresspattern', 'f_stress', filter_stresspattern);
  addFilterHiddenParam('numberofletters', 'f_nl', filter_numberofletters);
  addFilterHiddenParam('numberofsyllables', 'f_ns', filter_numberofsyllables);
  addFilterHiddenParam('rhymeswith', 'f_rw', filter_rhymeswith);
  addFilterHiddenParam('relatedto', 'f_rt', filter_relatedto)
}
function clearFilters() {
  filter_startswith = filter_relatedto = filter_rhymeswith = filter_vowelslike = filter_stresspattern = filter_soundslike = filter_numberofsyllables = filter_numberofletters = '';
  clearFilter('soundslike', 'Sounds like');
  clearFilter('vowelslike', 'Primary vowel');
  clearFilter('stresspattern', 'Meter');
  clearFilter('startswith', 'Starts with');
  clearFilter('relatedto', 'Related to');
  clearFilter('rhymeswith', 'Rhymes with');
  clearFilter('numberofletters', 'Num. letters');
  clearFilter('numberofsyllables', 'Num. syllables');
  showOrHideFilters()
}
function getResults(a) {
  $('#info').hide();
  $(this);
  var b = $(this.element),
  c = b.data('jqXHR');
  c && c.abort();
  panelToStartIndex = [
  ];
  setHelpline('Searching...');
  if (c = lookup()) if (b.data('jqXHR', c), 0 < $('#thesinput').length) try {
    saveWindowState(a)
  } catch (e) {
  }
}
function layoutResults(a) {
  for (var b = [
  ], c = {
  }, e = [
  ], l = THESAURUS_MAX_ITEMS_PER_PAGE / THESAURUS_MAX_COLUMNS, r = {
  }, u = {
  }, B = {
  }, z = {
  }, q = {
  }, v = '', n = null, A = [
  ], f = 0; f < resultData.length; f++) {
    var h = resultData[f].word,
    k;
    k = 'undefined' == typeof resultData[f].tags ? [
      'all'
    ] : [
      'all'
    ].concat(resultData[f].tags);
    h in COLORS && '' === v && (v = COLORS[h]);
    for (var g = 1; g < k.length; g++) 'syn' === k[g] ? r[h] = 1 : 'prop' === k[g] ? B[h] = 1 : 'ant' === k[g] && (u[h] = 1);
    'undefined' != typeof resultData[f].defs && (z[h] = resultData[f].defs, 'undefined' != typeof resultData[f].defHeadword && (q[h] = resultData[f].defHeadword));
    if ( - 1 !== $.inArray('query', k)) {
      if (!areFiltersActive() && (n = resultData[f], 'undefined' != typeof resultData[f].tags)) for (g = 0; g < resultData[f].tags.length; g++) k = resultData[f].tags[g],
      k.match(/^spellcor:/) && (k = k.replace('spellcor:', ''), A.push(k))
    } else {
      - 1 === $.inArray('syn', k) && !currentQueryHasWildcard() && !areFiltersActive() || null != n && n.defs || (n = resultData[f]);
      for (var y = 0, g = 0; g < k.length; g++) {
        var m = k[g];
        if ('syn' !== m && 'prop' !== m && 'ant' !== m && (m in c ? panelId = c[m] : (c[m] = e.length, b[e.length] = m, panelId = e.length), e[panelId] ? e[panelId].push(h)  : e[panelId] = [
          h
        ], y += 1, 2 == y)) break
      }
    }
  }
  if (4 <= e.length && (f = b[1], c = b[2], g = '', 'n' === f && (g = 'adj'), 'adj' === f && (g = 'n'), 'v' === f && (g = 'adv'), 'adv' === f && (g = 'v'), '' !== g && g !== c)) for (f = 3; f < e.length; f++) if (b[f] === g) {
    b[f] = b[2];
    b[2] = g;
    k = e[2];
    e[2] = e[f];
    e[f] = k;
    break
  }
  c = 0;
  $('#tabs').empty();
  $('#content').empty();
  for (f = 0; f < e.length; f++) if (c = f + 1, g = '<b>' + panelHeader(b[f]) + '</b>', '<b>Uncategorized</b>' !== g || 2 != e.length) {
    $('#tabs').append('<li><a href="#" name="zone' +
    c.toString() + '">' + g + '</a></li>');
    d = $('#zone' + c.toString());
    content = '<div class="thesaurus_results">';
    content += '<table width=100%><tr><td valign=top>';
    panelToStartIndex.length <= f && (panelToStartIndex[f] = 0);
    k = panelToStartIndex[f];
    y = Math.min(e[f].length, k + THESAURUS_MAX_ITEMS_PER_PAGE);
    alphabetized && e[f].sort();
    for (g = k; g < y; g++) {
      var h = e[f][g],
      w = 'res';
      1 == r[h] ? w = 'ressyn' : 1 == u[h] && (w = 'resant');
      m = '';
      1 == B[h] && (h = toTitleCase(h));
      var t = h.toLowerCase(),
      x = t in z ? THESAURUS_QUICKLINK_TEMPLATE : THESAURUS_QUICKLINK_TEMPLATE_NO_DEFS;
      'undefined' != typeof x && '' !== x && (m += '<div class=\'thes_ql\'>' + x.replace(/\%s/g, encodeURIComponent(h)).replace(/\%o/g, makeCurrentUrl(h)) + '</div> ');
      x = !1;
      if (t in z) {
        var p = z[t],
        t = q[t] ? q[t] : h,
        p = formatdefs(p, b[f], t);
        '' !== p && (m += '<div class=\'thes_defs\'>' + p + '</div>', x = !0)
      }
      h = '<span class=\'resnum\'>' + (g + 1).toString() + '.</span> <div thesw=\'' + encodeURIComponent(h) + '\' class=\'res ' + w + '\'>' + thesianchor(h, b[f], g);
      '' !== m && (w = 'more-info', x || (w = 'more-info more-info-no-defs'), h += '<div class=\'' + w + '\'><div class= \'actual-info\'>' +
      m + '</div></div>');
      h += '<br></div>';
      content += h + '<br>';
      g % l == l - 1 && (content += '</td><td valign=top>')
    }
    content += '</td></tr></table>';
    content += '</div>';
    g = '#previous_page_marker_' + f.toString();
    h = '#next_page_marker_' + f.toString();
    0 < k && (k > THESAURUS_MAX_ITEMS_PER_PAGE && (content += '<span onClick="' + ('pageChange(' + f.toString() + ',0);') + '" class="prevlink firstlink" id=' + g + '><button>&lt;&lt;&lt; First page&nbsp;&nbsp;</button></span>&nbsp;&nbsp;'), m = 'pageChange(' + f.toString() + ',' + Math.max(0, k - THESAURUS_MAX_ITEMS_PER_PAGE) +
    ');', content += '<span onClick="' + m + '" class="prevlink" id=' + g + '><button>&lt;&lt; ' + locText('PREVIOUS_RESULTS') + '</button></span>', $('.prevlink').mouseover(prevMouseOver));
    y < e[f].length && (m = 'pageChange(' + f.toString() + ',' + (k + THESAURUS_MAX_ITEMS_PER_PAGE) + ');', content += '<span onClick="' + m + '" class="nextlink" id=' + h + '><button>' + locText('NEXT_RESULTS') + ' &gt;&gt;</button></span>', $('.nextlink').mouseover(nextMouseOver));
    $('#content').append('<div id="zone' + c.toString() + '">' + content + '</div>')
  }
  0 === e.length && (0 < A.length ? showDidYouMean(A)  : fetchSpellCorsAndShowDym());
  areFiltersActive() && $('#filtertitle').html('<center><span class=\'filterinnertitle\' id=\'clearfilter\'><a onClick=\'clearFilters(); getResults(false);\'><button>Clear filters</button></a></span></center>');
  $('#tabs li:nth-child(' + (a + 1).toString() + ')').attr('id', 'current');
  $('#content').find('[id^=\'zone\']').hide();
  $('#content #zone' + (a + 1).toString()).show();
  $('#tabs a').click(function (a) {
    a.preventDefault();
    'current' != $(this).closest('li').attr('id') && ($('#content').find('[id^=\'zone\']').hide(), $('#tabs li').attr('id', ''), $(this).parent().attr('id', 'current'), $('#' + $(this).attr('name')).show())
  });
  0 !== e.length && $('#tabs').show();
  $('#content').show();
  $('#filtertitle').show();
  setBaseHelpline();
  a = $('#defbox');
  0 < a.length && (a.empty(), null != n && (p = n.defs, 'undefined' != typeof p ? (t = q[n.word] ? q[n.word] : n.word, p = format_compact_defs(p, 'all', t, u), a.append('<div class=\'actual-info\'><div class=\'thes_defs\'>' + p + '</div></div>'))  : filter_term.match(/[ ]/) || (p = THESAURUS_UNKNOWN_DEFS_TEMPLATE.replace(/\%s/g, encodeURIComponent(filter_term)), a.append('<div class=\'actual-info\'><div class=\'thes_defs\'>' + p + '</div></div>'))));
  a = $('#quickfilters');
  if (0 < a.length) {
    u = locText('RESTRICT_TO_METER') + ':<br>';
    for (f = 0; f < STRESS_PATTERNS.length; f++) q = STRESS_PATTERNS[f],
    n = filter_stresspattern === q ? 'meter_btn_selected' : 'meter_btn_unselected',
    b = filter_stresspattern === q ? '' : q,
    g = '\'/\' means stressed, \'x\' means unstressed.  Click a button to find words that match a certain meter.',
    u += '<button title="' + g + '" class="' + n + '" onClick=\'click_meter_filter("' +
    b + '");\'>' + q + '</button>';
    a.html(u)
  }
  addFilterHiddenParams();
  '' !== v && (v = '0 0 10px 5px ' + v, a = $('.shadow-box'), 0 < a.length && (a.css('-webkit-box-shadow', v), a.css('-moz-box-shadow', v), a.css('box-shadow', v)));
  a = $('#thesinput');
  0 < a.length && $('#thesinput').autocomplete('close');
  $('.res').click(clickres);
  a = $('.logo-img');
  0 < a.length && a.addClass('logo-img-results-page');
  a = $('#olthes_intro_text');
  0 < a.length && a.hide();
  alphabetized ? hasWildcard(filter_term) ? $('#rerank').html(rerankStr('relevance', 'Rank by popularity'))  :
  $('#rerank').html(rerankStr('relevance', 'Rank by relevance'))  : $('#rerank').html(rerankStr('alphabetize', locText('ALPHABETIZE')));
  a = $('#olthes_try_old');
  0 < a.length && (h = 'http://www.onelook.com/?w=*&loc=revfp_legacy&clue=' + filter_term, a.html('<i><a href="' + h + '">Try this query on the old system</a></i>'));
  0 < $('#filter_startswith').length && 0 < $('#filter_numberofletters').length && (hasWildcard(filter_term) ? ($('#filter_startswith').hide(), $('#filter_numberofletters').hide(), $('#filter_numberofsyllables').hide(), $('#filter_vowelslike').hide(), $('#filter_stresspattern').hide())  : ($('#filter_startswith').show(), $('#filter_numberofletters').show(), $('#filter_numberofsyllables').show(), $('#filter_vowelslike').show(), $('#filter_stresspattern').show()))
}
function pageChange(a, b) {
  panelToStartIndex[a] = b;
  layoutResults(a)
}
function theslink(a) {
  return THESAURUS_BASE_URL + encodeURIComponent(a)
}
function panelHeader(a) {
  return 'all' === a ? locText('POS_ALL')  : 'adj' === a ? locText('POS_ADJECTIVES')  : 'n' === a ? locText('POS_NOUNS')  : 'v' === a ? locText('POS_VERBS')  : 'adv' === a ? locText('POS_ADVERBS')  : locText('POS_UNCATEGORIZED')
}
function toggleres(a) {
  var b = $(a).find('.more-info');
  b.hasClass('more-info-selected') ? (b.removeClass('more-info-selected'), selected_res = null)  : (b.addClass('more-info-selected'), selected_res = a)
}
function globalOnclick(a) {
  null !== selected_res && selected_res !== a && (toggleres(selected_res), setBaseHelpline())
}
function clickres(a) {
  a.stopPropagation();
  a = a.target;
  if (null !== selected_res) {
    if ($(selected_res).is($(a))) {
      var b = decodeURIComponent($(selected_res).attr('thesw'));
      window.location.href = THESAURUS_RELATED_TEMPLATE.replace(/\%s/g, b)
    } else if ($.contains(selected_res, a)) return;
    toggleres(selected_res)
  }
  toggleres(a);
  null != selected_res && 'undefined' === typeof THESAURUS_SUPPRESS_BASE_HELPLINE && (b = decodeURIComponent($(selected_res).attr('thesw')), setHelpline('Click on <i>' + b + '</i> again to jump to its related words.'))
}
function thesianchor(a, b, c) {
  var e = a;
  30 < e.length ? (b && 0 < c && (e = e.replace(b, '...')), 40 < e.length && (e = e.substring(0, 29) + '...'), a = THESAURUS_CLICKABLE_ENTRIES ? '<a title="' + a + '" href="' + theslink(a) + '">' + e + '</a>' : e)  : a = THESAURUS_CLICKABLE_ENTRIES ? '<a href="' + theslink(a) + '">' + e + '</a>' : e;
  return a
}
function formatdefs(a, b, c) {
  s = '';
  for (var e = 0; e < a.length; e++) {
    var l = a[e].split('\t');
    if (1 < l.length) {
      var r = l[0];
      if ('all' === b || b === r) '' === s && (s = 'undefined' != typeof c ? '<b class=\'thes_ql_title\'><i>' + c + '</i></b>:<br><br><ul>' : '<ul>'),
      s += '<li> ' + l[1] + '<br>'
    } else '' === s && (s = 'undefined' != typeof c ? 'Definitions for <i>' + c + '</i>:<br><br><ul>' : '<ul>'),
    s += '<li> ' + a[e] + '<br>'
  }
  '' !== s && (s += '</ul>');
  return s
}
function format_compact_defs(a, b, c, e) {
  s = '';
  for (var l = 0; l < a.length; l++) {
    var r = a[l].split('\t');
    if (1 < r.length) {
      var u = r[0];
      if ('all' === b || b === u) '' === s && (s = 'undefined' != typeof c ? '<b><i>' + c + '</i></b>: ' : ''),
      s += '  ' + r[1],
      s += '; '
    }
    if (s.length > MAX_TOPDEF_LENGTH_CHARS) break
  }
  s.length > MAX_TOPDEF_LENGTH_CHARS && (s = s.substring(0, MAX_TOPDEF_LENGTH_CHARS) + '... ');
  s += THESAURUS_MORE_DEFS_TEMPLATE.replace(/\%s/g, encodeURIComponent(c));
  $.isEmptyObject(e) || (s += '<span id="thesaurus_ants">' + formatAntonyms(e) + '</span>', s +=
  ' <button id="thesaurus_ants_button" onClick="clickAntonyms();">antonyms...</button>');
  return s
}
function formatAntonyms(a) {
  var b = '',
  c;
  for (c in a) a = '<a class="resant" href="' + THESAURUS_RELATED_TEMPLATE.replace(/%s/g, encodeURIComponent(c)) + '&loc=ant">' + c + '</a>',
  b += a + ' ';
  return b
}
function clickAntonyms() {
  $('#thesaurus_ants_button').hide();
  $('#thesaurus_ants').show()
}
function lookup() {
  var a = filter_term,
  b;
  '' !== full_api_query ? b = full_api_query : (b = THESAURUS_API_URL + '/words?k=olt_test&max=997&qe=ml&md=dp', '' !== a && '*' !== a && (b += '&ml=' + encodeURIComponent(a.replace(/[:].*/, ''))), '' !== requested_lang && (b += '&v=' + encodeURIComponent(requested_lang)));
  var c = '';
  '' !== filter_numberofletters ? (c = parseInt(filter_numberofletters), c = Math.min(c, 20), c = '' !== filter_startswith ? filter_startswith + Array(c - filter_startswith.length + 1).join('?')  : Array(c + 1).join('?'))  : '' !== filter_startswith && (c = filter_startswith + '*');
  '' !== c && (b += '&sp=' + encodeURIComponent(c));
  '' !== filter_relatedto && (b += '&topics=' + encodeURIComponent(filter_relatedto));
  '' !== filter_rhymeswith && (b += '&sl=rhy:' + encodeURIComponent(filter_rhymeswith));
  '' !== filter_soundslike ? b += '&sl=' + encodeURIComponent(filter_soundslike)  : '' !== filter_stresspattern ? (c = filter_stresspattern.replace(/[xX]/g, '0').replace(/[/]/g, '1'), b += '&sl=stress:' + encodeURIComponent(c))  : '' !== filter_vowelslike ? b += '&sl=vowels:' + encodeURIComponent(filter_vowelslike)  : '' !==
  filter_numberofsyllables && (c = parseInt(filter_numberofsyllables), c = Math.min(c, 20), c = Array(c + 1).join('?'), b += '&sl=pp:' + encodeURIComponent(c));
  return $.ajax({
    dataType: 'json',
    type: 'Get',
    url: b,
    error: function (b, c, r) {
      b = 'Sorry, we could not connect to the database.';
      c = THESAURUS_FALLBACK_URL + encodeURIComponent(a.replace(/[:].*/, ''));
      b += ' <a href="' + c + '">' + THESAURUS_FALLBACK_MSG + '</a>';
      setHelpline(b)
    },
    success: function (a) {
      resultData = a;
      layoutResults(0)
    }
  })
}
function inputFocus(a) {
  var b = $(a);
  b.addClass('activefilter');
  - 1 !== a.value.indexOf(':') ? a.value = b.data('prev')  : a.value == a.defaultValue && (a.value = '');
  var b = '<b>' + locText('FILT_HELP_HEADER') + '</b>: ',
  c = '';
  'Starts with...' === a.defaultValue ? c = locText('FILT_HELP_STARTS_WITH')  : 'Num letters...' === a.defaultValue ? c = locText('FILT_HELP_NUM_LETTERS')  : 'Also related to...' === a.defaultValue ? c = locText('FILT_HELP_ALSO_RELATED')  : 'Rhymes with...' === a.defaultValue ? c = locText('FILT_HELP_RHYMES')  : 'Sounds like...' === a.defaultValue ?
  c = locText('FILT_HELP_SOUNDS_LIKE')  : 'Primary vowel...' === a.defaultValue ? c = '' === filter_term ? locText('FILT_HELP_NEEDS_TOPIC')  : locText('FILT_HELP_VOWELS_LIKE')  : 'Meter...' === a.defaultValue ? c = '' === filter_term ? locText('FILT_HELP_NEEDS_TOPIC')  : locText('FILT_HELP_METER')  : 'Num syllables...' === a.defaultValue && (c = '' === filter_term ? locText('FILT_HELP_NEEDS_TOPIC')  : locText('FILT_HELP_NUM_SYLLABLES'));
  '' !== c && setHelpline(b + '<i>' + c + '</i>');
  'Meter...' === a.defaultValue && $('#filter_stresspattern').autocomplete('search', '');
  'Num syllables...' === a.defaultValue && $('#filter_numberofsyllables').autocomplete('search', '');
  'Primary vowel...' === a.defaultValue && $('#filter_vowelslike').autocomplete('search', '')
}
function inputBlur(a, b) {
  var c = $(a);
  '' === a.value ? (a.value = a.defaultValue, c.removeClass('activefilter'), c.addClass('inactivefilter'))  : (c.data('prev', a.value), a.value = b + ': ' + a.value, 19 < a.value.length && (a.value = a.value.substring(0, 16) + '...'), c.removeClass('inactivefilter'), c.addClass('activefilter'));
  setBaseHelpline()
}
function thesInputBlur(a) {
  filter_term = $(a).val();
  full_api_query = getApiUrl(filter_term, !1)
}
function endsWith(a, b) {
  return - 1 !== a.indexOf(b, a.length - b.length)
}
function getApiUrl(a, b) {
  var c = 'http://api.onelook.com',
  e;
  10 < a.length && endsWith(a, '?') && !hasWildcard(a.substring(0, a.length - 1)) && (a = a.substring(0, a.length - 1));
  if (hasWildcard(a)) {
    var l = a.split(':');
    1 < l.length ? (e = '2', c += '/words?v=ol_gte3&sp=' + encodeURIComponent(l[0]) + '&ml=' + encodeURIComponent(l[1]))  : (e = '1', c += '/words?v=ol_gte3&sp=' + encodeURIComponent(l[0]))
  } else a = a.replace(':', ''),
  !b || a.match(/[ ].../) ? (e = '4', c += '/words?v=ol_gte3&ml=' + encodeURIComponent(a), b || (c += '&qe=ml'))  : (e = '3', c += '/sug?v=ol_gte3&s=' +
  encodeURIComponent(a));
  return b ? c + ('&max=10&k=olthes_ac' + e)  : c + ('&md=dp&max=1000&k=olthes_r' + e)
}
function toTitleCase(a) {
  return a.replace(/\w\S*/g, function (a) {
    return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
  })
}
function filtersAreOpen() {
  return 'block' === document.getElementById('filteroptions').style.display
}
function toggleFilters() {
  var a = document.getElementById('filteroptions');
  'block' == a.style.display ? (a.style.display = 'none', $('#filtertitle').html('<center><span class="filterinnertitle"><button onClick="toggleFilters();">' + locText('SHOW_FILTERS') + '</button></span></center>'))  : (a.style.display = 'block', $('#filtertitle').html(''), more_info = '(<a target="_blank" href="http://onelook.com/thesaurus/whatsnew/?fh=1#filters">' + locText('HELP') + '</a>)', '' === filter_term ? setHelpline('<b>Filter results</b>: <i>The filters below can help you narrow down the results after you type a topic above.<br>If you leave the topic blank, the filters will apply to all of the words that OneLook knows about. ' +
  more_info + '</i>')  : areFiltersActive() ? setHelpline('')  : setHelpline(locText('FILT_HELP_TOP') + ' ' + more_info + '</i>'), $('#filterpane').show())
}
$(function () {
  $('#filter_startswith').autocomplete({
    minLength: 0,
    delay: 200,
    source: function (a, b) {
      filter_startswith = a.term;
      getResults(!1)
    }
  });
  $('#filter_relatedto').autocomplete({
    minLength: 0,
    delay: 200,
    source: function (a, b) {
      filter_relatedto = a.term;
      getResults(!1)
    }
  });
  $('#filter_rhymeswith').autocomplete({
    minLength: 0,
    delay: 200,
    source: function (a, b) {
      filter_rhymeswith = a.term;
      getResults(!1)
    }
  });
  $('#filter_soundslike').autocomplete({
    minLength: 0,
    delay: 200,
    source: function (a, b) {
      filter_soundslike = a.term;
      filter_numberofsyllables = '';
      clearFilter('numberofsyllables', 'Num. syllables');
      filter_vowelslike = '';
      clearFilter('vowelslike', 'Primary vowel');
      getResults(!1)
    }
  });
  $('#filter_vowelslike').autocomplete({
    minLength: 0,
    delay: 0,
    source: function (a, b) {
      var c = VOWEL_SOUND_PROTOTYPES.concat(['Pick a vowel sound above']);
      b(c)
    },
    search: function (a, b) {
      '' === $('#filter_vowelslike').val() && '' !== filter_vowelslike && filt_vowels('')
    },
    select: function (a, b) {
      if (b.item.value.match('Pick')) b.item.value = $('#filter_vowelslike').val();
       else {
        var c = b.item.value.replace(/.* in /gm, '').replace(')', '');
        $('#filter_vowelslike').val(c);
        filt_vowels(c)
      }
    }
  });
  $('#filter_stresspattern').autocomplete({
    minLength: 0,
    delay: 0,
    source: function (a, b) {
      var c = STRESS_PATTERNS.concat(['Pick or type a stress pattern']);
      b(c);
      '' !== a.term && filt_meter(a.term)
    },
    search: function (a, b) {
      '' === $('#filter_stresspattern').val() && '' !== filter_stresspattern && filt_meter('')
    },
    select: function (a, b) {
      b.item.value.match('Pick') ? b.item.value = $('#filter_stresspattern').val()  : ($('#filter_stresspattern').val(b.item.value), filt_meter(b.item.value))
    }
  });
  $('#filter_numberofsyllables').autocomplete({
    minLength: 0,
    delay: 0,
    source: function (a, b) {
      var c = SYLLABLE_COUNTS.concat(['Pick or type a syllable count']);
      b(c);
      '' !== a.term && filt_sylcount(a.term)
    },
    search: function (a, b) {
      '' === $('#filter_numberofsyllables').val() && '' !== filter_numberofsyllables && filt_sylcount('')
    },
    select: function (a, b) {
      b.item.value.match('Pick') ? b.item.value = $('#filter_numberofsyllables').val()  : ($('#filter_numberofsyllables').val(b.item.value), filt_sylcount(b.item.value))
    }
  });
  $('#filter_numberofletters').autocomplete({
    minLength: 0,
    delay: 20,
    source: function (a, b) {
      filter_numberofletters = a.term;
      getResults(!1)
    }
  })
});
function fetchSpellCorsAndShowDym() {
  var a = THESAURUS_API_URL + '/words?k=olt_spellcheck&max=1&sp=' + encodeURIComponent(filter_term);
  return $.ajax({
    dataType: 'json',
    type: 'Get',
    url: a,
    success: function (a) {
      for (var c = [
      ], e = 0; e < a.length; e++) a[e].word !== filter_term && c.push(a[e].word);
      showDidYouMean(c)
    }
  })
}
function showDidYouMean(a) {
  var b = 'No results found.';
  if (0 < a.length && !areFiltersActive()) {
    for (var b = b + ('<br>' + locText('DID_YOU_MEAN') + ': '), c = 0; c < a.length; c++) {
      var e = THESAURUS_RELATED_TEMPLATE.replace(/\%s/g, encodeURIComponent(a[c]));
      '' !== requested_lang && (e += '&lang=' + requested_lang);
      e += '&loc=jsdym';
      b += ' <a href="' + e + '">' + a[c] + '</a>'
    }
    b += '?'
  }
  '' !== b && $('#content').append('<div class="nonefound" id="zone1">' + b + '</div>')
}
function locText(a) {
  if ('ALPHABETIZE' === a) return 'es' === requested_lang ? 'Alfabetizar' : 'Alphabetize';
  if ('POS_ALL' == a) return 'es' === requested_lang ? 'Todas' : 'All';
  if ('POS_NOUNS' == a) return 'es' === requested_lang ? 'Sustantivos' : 'Nouns';
  if ('POS_VERBS' == a) return 'es' === requested_lang ? 'Verbos' : 'Verbs';
  if ('POS_ADVERBS' == a) return 'es' === requested_lang ? 'Adverbios' : 'Adverbs';
  if ('POS_UNCATEGORIZED' == a) return 'es' === requested_lang ? 'Otro' : 'Uncategorized';
  if ('POS_ADJECTIVES' == a) return 'es' === requested_lang ? 'Adjetivos' : 'Adjectives';
  if ('DID_YOU_MEAN' == a) return 'es' === requested_lang ? '&iquest;Quieras decir' : 'Did you mean';
  if ('SHOW_FILTERS' == a) return 'es' === requested_lang ? 'Revelas filtros' : 'Show filters';
  if ('FILT_HELP_STARTS_WITH' == a) return 'es' === requested_lang ? 'Escriba cualquier letras para mostrar palabras que empiezan con esas letras' : 'Type any letters to show words that begin with those letters';
  if ('FILT_HELP_NUM_LETTERS' == a) return 'es' === requested_lang ? 'Escriba un número para mostrar palabras que tienen ese número de letras' :
  'Type a number to show words that are that many letters';
  if ('FILT_HELP_ALSO_RELATED' == a) return 'es' === requested_lang ? 'Escriba un concepto para subir palabras relacionadas' : 'Type any concept to bring words related to that concept to the top';
  if ('FILT_HELP_RHYMES' == a) return 'es' === requested_lang ? 'Escriba una palabra para mostrar sólo las palabras que riman con esa palabra' : 'Type a word to show only words that rhyme with it';
  if ('FILT_HELP_SOUNDS_LIKE' == a) return 'es' === requested_lang ? 'Escriba cualquier letras para mostrar sólo palabras pronunciadas con esas letras' :
  'Type a word to show only words pronounced similarly to it';
  if ('FILT_HELP_VOWELS_LIKE' == a) return 'es' === requested_lang ? 'Escriba una palabra para mostrar sólo las palabras que tienen la misma vocal primaria' : 'Pick a primary vowel sound from the list';
  if ('FILT_HELP_METER' == a) return 'es' === requested_lang ? 'Escriba una secuencia de \'x\' (sin acento) y \'/\' (con acento), para mostrar palabras que tienen ese acentuación' : 'Pick a meter using \'/\' for stressed, \'x\' for unstressed (<a target="_blank" href="https://en.wikipedia.org/wiki/Scansion#2-level_notations">Help</a>)';
  if ('FILT_HELP_NUM_SYLLABLES' == a) return 'es' === requested_lang ? 'Escriba un número para mostrar palabras que tienen ese número de sílabas' : 'Type a number to show words that have that many syllables';
  if ('FILT_HELP_NEEDS_TOPIC' == a) return 'es' === requested_lang ? 'Lo sentimos, este filtro no funciona actualmente a menos que también haya un tema previamente especificado.' : 'Sorry, this filter does not currently work unless there\'s also a topic specified above.';
  if ('RESTRICT_TO_METER' == a) return 'es' ===
  requested_lang ? 'Ritmo' : 'Restrict to meter';
  if ('PREVIOUS_RESULTS' == a) return 'es' === requested_lang ? 'Anterior' : 'Previous results';
  if ('NEXT_RESULTS' == a) return 'es' === requested_lang ? 'Siguiente' : 'Next results';
  if ('FILT_HELP_TOP' == a) return 'es' === requested_lang ? '<b>Filtrar</b>: Seleccione un filtro para reducir las palabras relacionadas' : '<b>Filter results</b>: <i>Choose a filter to narrow down the list of results';
  if ('FILT_HELP_TOP_ACTIVE' == a) return 'es' === requested_lang ? '<b>Filtrar</b>: Seleccione un filtro para reducir las palabras relacionadas' :
  '<i>The filters in green below are active</i>';
  if ('FILT_HELP_HEADER' == a) return 'es' === requested_lang ? 'Filtrar' : 'Filter';
  if ('HELP' == a) return 'es' === requested_lang ? 'Ayuda' : 'Help'
};
