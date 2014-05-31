(function() {
  var EME_spec_url = "http://www.w3.org/TR/encrypted-media/";
  var HTML_spec_url = "http://www.w3.org/TR/html5/embedded-content-0.html";
  var DOM_spec_url = "http://dom.spec.whatwg.org/";

  function url_helper(doc, url) {
    if (url[0] == "#" && doc.emeDefGroupName != window.respecConfig.emeDefGroupName) {
        return groupBaseURLs[doc.emeDefGroupName] + url;
    }
    return url;
  }

  function eventdfn_helper(doc, df, id, text) {
    df.appendChild($("<dfn/>").attr({id: 'dom-evt-' + text.toLowerCase()}).wrapInner($("<code/>").text(text))[0]);
  }

  function idlref_helper(doc, df, id, text) {
    df.appendChild($("<code/>").wrapInner($("<a/>").attr({href: url_helper(doc, "#" + id)}).text(text))[0]);
  }

  function eventref_helper(doc, df, id, text) {
    df.appendChild($("<code/>").wrapInner($("<a/>").attr({href: url_helper(doc, "#dom-evt-" + id)}).text(text))[0]);
  }

  function videoref_helper(doc, df, id, text) {
    link_helper(doc, df, HTML_spec_url + '#' + id, text);
  }

  function code_videoref_helper(doc, df, id, text) {
    df.appendChild($("<code/>").wrapInner($("<a/>").attr({href: HTML_spec_url + "#" + id}).text(text))[0]);
  }

  function encodingapi_helper(doc, df, id, text) {
    link_helper(doc, df, 'http://www.w3.org/TR/encoding/#' + id, text);
  }

  function webappapis_helper(doc, df, id, text) {
    link_helper(doc, df, 'http://www.w3.org/TR/html5/webappapis.html#' + id, text);
  }

  function infrastructure_helper(doc, df, id, text) {
    link_helper(doc, df, 'http://www.w3.org/TR/html5/infrastructure.html#' + id, text);
  }

  function browsers_helper(doc, df, id, text) {
    link_helper(doc, df, 'http://www.w3.org/TR/html5/browsers.html#' + id, text);
  }

  function term_helper(doc, df, id, text) {
    link_helper(doc, df, url_helper(doc, '#' + id), text);
  }

  function var_helper(doc, df, id, text) {
    df.appendChild($("<var/>").wrapInner($("<a/>").attr({href: url_helper(doc, id)}).text(text))[0]);
  }

  function link_helper(doc, df, id, text) {
    df.appendChild($("<a/>").attr({href: url_helper(doc, id)}).text(text)[0]);
  }

  function exception_helper(doc, df, id, text) {
    df.appendChild($("<code/>").wrapInner($("<a/>").attr({href: DOM_spec_url + '#dom-domexception-' + id}).text(text))[0]);
  }

  function webmref_helper(doc, df, id, text) {
    link_helper(doc, df, 'http://www.webmproject.org/code/specs/container/#' + id, text);
  }

  function queue_and_fire_helper(doc, df, id, text) {
    webappapis_helper(doc, df, 'queue-a-task', text);
    df.appendChild(doc.createTextNode(' to '));
    webappapis_helper(doc, df, 'fire-a-simple-event', 'fire a simple event');
    df.appendChild(doc.createTextNode(' named'));
  }

  function queue_and_fire_track_event_helper(doc, df, id, text) {
    webappapis_helper(doc, df, 'queue-a-task', 'Queue a task');
    df.appendChild(doc.createTextNode(' to fire a '));
    infrastructure_helper(doc, df, 'concept-events-trusted', 'trusted event');
    df.appendChild(doc.createTextNode(' named '));
    code_videoref_helper(doc, df, 'handler-tracklist-on' + text, text);
    df.appendChild(doc.createTextNode(', that does not bubble and is not cancelable, and that uses the '));
    code_videoref_helper(doc, df, 'trackevent', 'TrackEvent');
    df.appendChild(doc.createTextNode(' interface,'));
  }

  function fragment_helper(doc, df, id, text) {
    var f = doc.createElement('span')
    f.innerHTML = text;
    df.appendChild(f);
  }

  function contributors_helper(doc, df, id, text) {
    var contributors = window.respecConfig.emeContributors;
    contributors.sort();

    var str = "";
    for (var i = 0; i < contributors.length - 1; ++i) {
      if (i > 0)
	str += ", ";
      str += contributors[i];
    }
    str += ", and ";
    str += contributors[contributors.length - 1];

    df.appendChild(doc.createTextNode(str));
  }

  var emeDefinitions = {
    'eme-spec': { func: link_helper, fragment: '#', link_text: 'Encrypted Media Extensions', },

    'interface-textencoder': { func: encodingapi_helper, fragment: 'interface-textencoder', link_text: 'TextEncoder interface',  },
    
    'eventdfn': { func: eventdfn_helper, fragment: '', link_text: '', },

    'videoref': { func: videoref_helper, fragment: '', link_text: '', },
    'media-timeline': { func: videoref_helper, fragment: 'media-timeline', link_text: 'media timeline',  },
    'media-element-load-algorithm': { func: videoref_helper, fragment: 'media-element-load-algorithm', link_text: 'media element load algorithm',  },
    'resource-fetch-algorithm': { func: videoref_helper, fragment: 'concept-media-load-resource', link_text: 'resource fetch algorithm',  },
    'intrinsic-width-and-height': { func: videoref_helper, fragment: 'concept-video-intrinsic-width', link_text: 'intrinsic width and height',  },
    'normalized-timeranges-object': { func: videoref_helper, fragment: 'normalized-timeranges-object', link_text: 'normalized TimeRanges object',  },
    'current-playback-position': { func: videoref_helper, fragment: 'current-playback-position', link_text: 'current playback position',  },
    'media-data-is-corrupted': { func: videoref_helper, fragment: 'fatal-decode-error', link_text: 'media data is corrupted',  },
    'media-src': { func: code_videoref_helper, fragment: 'attr-media-src', link_text: 'src',  },
    'timerange': { func: code_videoref_helper, fragment: 'timeranges', link_text: 'TimeRange',  },
    'timeranges': { func: code_videoref_helper, fragment: 'timeranges', link_text: 'TimeRanges',  },
    'tracklist-change': { func: code_videoref_helper, fragment: 'handler-tracklist-onchange', link_text: 'change',  },
    'video-track': { func: code_videoref_helper, fragment: 'videotrack', link_text: 'VideoTrack',  },
    'video-track-list': { func: code_videoref_helper, fragment: 'videotracklist', link_text: 'VideoTrackList', },
    'videotrack-id': { func: code_videoref_helper, fragment: 'dom-videotrack-id', link_text: 'id', },
    'videotrack-kind': { func: code_videoref_helper, fragment: 'dom-videotrack-kind', link_text: 'kind', },
    'videotrack-language': { func: code_videoref_helper, fragment: 'dom-videotrack-language', link_text: 'language', },
    'videotrack-selected': { func: code_videoref_helper, fragment: 'dom-videotrack-selected', link_text: 'selected', },
    'videotrack-sourceBuffer': { func: idlref_helper, fragment: 'widl-VideoTrack-sourceBuffer', link_text: 'sourceBuffer', },
    'videotracklist-length': { func: code_videoref_helper, fragment: 'dom-videotracklist-length', link_text: 'length',  },
    'videotracks': { func: code_videoref_helper, fragment: 'dom-media-videotracks', link_text: 'videoTracks',  },
    'audio-track': { func: code_videoref_helper, fragment: 'audiotrack', link_text: 'AudioTrack',  },
    'audio-track-list': { func: code_videoref_helper, fragment: 'audiotracklist', link_text: 'AudioTrackList', },
    'audiotracklist-length': { func: code_videoref_helper, fragment: 'dom-audiotracklist-length', link_text: 'length', },
    'audiotracks': { func: code_videoref_helper, fragment: 'dom-media-audiotracks', link_text: 'audioTracks',  },
    'audiotrack-id': { func: code_videoref_helper, fragment: 'dom-audiotrack-id', link_text: 'id',  },
    'audiotrack-kind': { func: code_videoref_helper, fragment: 'dom-audiotrack-kind', link_text: 'kind', },
    'audiotrack-language': { func: code_videoref_helper, fragment: 'dom-audiotrack-language', link_text: 'language', },
    'audiotrack-enabled': { func: code_videoref_helper, fragment: 'dom-audiotrack-enabled', link_text: 'enabled', },
    'audiotrack-sourceBuffer': { func: idlref_helper, fragment: 'widl-AudioTrack-sourceBuffer', link_text: 'sourceBuffer', },
    'av-kind-categories-table': { func: code_videoref_helper, fragment: 'dom-TrackList-getKind-categories', link_text: 'kind categories table', },
    'text-track-kind-list': { func: code_videoref_helper, fragment: 'text-track-kind', link_text: 'text track kind list', },
    'text-track': { func: code_videoref_helper, fragment: 'texttrack', link_text: 'TextTrack',  },
    'text-track-list': { func: code_videoref_helper, fragment: 'texttracklist', link_text: 'TextTrackList', },
    'texttracks': { func: code_videoref_helper, fragment: 'dom-media-texttracks', link_text: 'textTracks', },
    'texttrack-mode': { func: code_videoref_helper, fragment: 'dom-texttrack-mode', link_text: 'mode',  },
    'texttrack-id': { func: code_videoref_helper, fragment: 'dom-texttrack-id', link_text: 'id', },
    'texttrack-kind': { func: code_videoref_helper, fragment: 'dom-texttrack-kind', link_text: 'kind', },
    'texttrack-language': { func: code_videoref_helper, fragment: 'dom-texttrack-language', link_text: 'language', },
    'texttrack-showing': { func: code_videoref_helper, fragment: 'dom-texttrack-showing', link_text: '"showing"', },
    'texttrack-hidden': { func: code_videoref_helper, fragment: 'dom-texttrack-hidden', link_text: '"hidden"',  },
    'texttrack-sourceBuffer': { func: idlref_helper, fragment: 'widl-TextTrack-sourceBuffer', link_text: 'sourceBuffer', },
    'ready-state': { func: code_videoref_helper, fragment: 'dom-media-readystate', link_text: 'HTMLMediaElement.readyState',  },
    'have-nothing': { func: code_videoref_helper, fragment: 'dom-media-have_nothing', link_text: 'HAVE_NOTHING',  },
    'have-metadata': { func: code_videoref_helper, fragment: 'dom-media-have_metadata', link_text: 'HAVE_METADATA',  },
    'have-current-data': { func: code_videoref_helper, fragment: 'dom-media-have_current_data', link_text: 'HAVE_CURRENT_DATA',  },
    'have-future-data': { func: code_videoref_helper, fragment: 'dom-media-have_future_data', link_text: 'HAVE_FUTURE_DATA',  },
    'have-enough-data': { func: code_videoref_helper, fragment: 'dom-media-have_enough_data', link_text: 'HAVE_ENOUGH_DATA',  },
    'loadedmetadata': { func: code_videoref_helper, fragment: 'event-media-loadedmetadata', link_text: 'loadedmetadata',  },
    'loadeddata': { func: code_videoref_helper, fragment: 'event-media-loadeddata', link_text: 'loadeddata',  },
    'canplay': { func: code_videoref_helper, fragment: 'event-media-canplay', link_text: 'canplay',  },
    'canplaythrough': { func: code_videoref_helper, fragment: 'event-media-canplaythrough', link_text: 'canplaythrough',  },
    'htmlmediaelement': { func: code_videoref_helper, fragment: 'htmlmediaelement', link_text: 'HTMLMediaElement',  },
    'hme-duration': { func: code_videoref_helper, fragment: 'media-controller-duration', link_text: 'media controller duration',  },
    'hme-buffered': { func: code_videoref_helper, fragment: 'dom-media-buffered', link_text: 'HTMLMediaElement.buffered',  },
    'hme-seek-algorithm': { func: videoref_helper, fragment: 'dom-media-seek', link_text: 'seek algorithm',  },
    'hme-duration-change-algorithm': { func: videoref_helper, fragment: 'durationChange', link_text: 'HTMLMediaElement duration change algorithm',  },
    'htmlvideoelement': { func: code_videoref_helper, fragment: 'htmlvideoelement', link_text: 'HTMLVideoElement',  },

    'total-video-frame-count': { func: var_helper, fragment: '#total-video-frame-count', link_text: 'total video frame count', },
    'dropped-video-frame-count': { func: var_helper, fragment: '#dropped-video-frame-count', link_text: 'dropped video frame count', },
    'corrupted-video-frame-count': { func: var_helper, fragment: '#corrupted-video-frame-count', link_text: 'corrupted video frame count', },
    'displayed-frame-delay-sum': { func: var_helper, fragment: '#displayed-frame-delay-sum', link_text: 'displayed frame delay sum', },

    'invalid-access-err': { func: exception_helper, fragment: 'invalid_access_err', link_text: 'INVALID_ACCESS_ERR',  },
    'invalid-state-err': { func: exception_helper, fragment: 'invalid_state_err', link_text: 'INVALID_STATE_ERR',  },
    'not-found-err': { func: exception_helper, fragment: 'not_found_err', link_text: 'NOT_FOUND_ERR',  },
    'not-supported-err': { func: exception_helper, fragment: 'not_supported_err', link_text: 'NOT_SUPPORTED_ERR',  },
    'quota-exceeded-err': { func: exception_helper, fragment: 'quota_exceeded_err', link_text: 'QUOTA_EXCEEDED_ERR',  },

    'queue-a-task-to-fire-an-event-named': { func: queue_and_fire_helper, fragment: '', link_text: 'queue a task',  },
    'Queue-a-task-to-fire-an-event-named': { func: queue_and_fire_helper, fragment: '', link_text: 'Queue a task',  },
    'Queue-and-fire-addtrack': { func: queue_and_fire_track_event_helper, fragment: '', link_text: 'addtrack',  },
    'Queue-and-fire-removetrack': { func: queue_and_fire_track_event_helper, fragment: '', link_text: 'removetrack',  },
    'provide-a-stable-state': { func: webappapis_helper, fragment: 'provide-a-stable-state', link_text: 'provide a stable state',  },

    'origin': { func: browsers_helper, fragment: 'origin-0', link_text: 'origin', },
    'effective-script-origin': { func: browsers_helper, fragment: 'effective-script-origin', link_text: 'effective script origin', },


    'media-data-cannot-be-fetched': { func: fragment_helper, fragment: '', link_text: '&quot;<i>If the media data cannot be fetched at all, due to network errors, causing the user agent to give up trying to fetch the resource</i>&quot;', },
    'perform-potentially-cors-enabled-fetch': { func: fragment_helper, fragment: '', link_text: '&quot;<i>Perform a potentially CORS-enabled fetch</i>&quot;', },

    'contributors': { func: contributors_helper, fragment: '', link_text: '', },
  };

  var definitionInfo = {};
  var groupBaseURLs = {};
  var helperTypes = {
      'link' : link_helper,
      'var' : var_helper,
  };

  function encryptedMediaAddDefinitionInfo(groupName, groupBaseURL, definitions) {
      groupBaseURLs[groupName] = groupBaseURL;
      for (var def_id in definitions) {
	  if (definitionInfo[def_id]) {
	      console.log("Overriding previous definition of def-id '" + def_id + "'.");
	  }
          var info = definitions[def_id];
          info.groupName = groupName;
          if (!info.func) {
	      var helper_type = info.helper_type || "link";
              info.func = helperTypes[helper_type];
	  }
	  definitionInfo[def_id] = info;
      }
  }

  function encryptedMediaPreProcessor() {
    for (var x in groupBaseURLs) {
      if (groupBaseURLs[x] == EME_spec_url && window.respecConfig.specStatus == "ED") {
	  EME_spec_url = "encrypted-media.html";
	  groupBaseURLs[x] = EME_spec_url;
	  break;
      }
    }

   $("a[def-id]").each(function () {
       $(this).addClass('externalDFN');
     });
  }

  function encryptedMediaPostProcessor() {
    var doc = document;
    doc.normalize();

    var usedMap = {};

    $("a[def-id]").each(function () {
      var $ant = $(this);
      var def_id = $ant.attr('def-id');
      var info = definitionInfo[def_id];
      if (info) {
	if (!usedMap[def_id]) {
	  usedMap[def_id] = 1;
	} else {
	  usedMap[def_id]++;
	}

	var id = info.fragment;
	var text = info.link_text;

	if ($ant.attr('name')) {
	  id = $ant.attr('name');
	}

	var element_text = this.innerHTML;
	if (element_text) {
	  text = element_text;
	}

	var df = doc.createDocumentFragment();
        doc.emeDefGroupName = info.groupName;
        info.func(doc, df, id, text);
        doc.emeDefGroupName = "";
	this.parentNode.replaceChild(df, this);

      } else {
        console.log("Found def-id '" + def_id + "' but it does not correspond to anything");
      }
    });

    // Update links to external type definitions.
    var externalClassInfo = {
      'MediaKeys': { spec: 'eme', fragment: 'idl-def-MediaKeys' },
      'AudioTrackList': {spec: 'html5', fragment: 'audiotracklist' },
      'TextTrackList': {spec: 'html5', fragment: 'texttracklist' },
      'TimeRanges': { spec: 'html5', fragment: 'timeranges' },
      'VideoTrackList': {spec: 'html5', fragment: 'videotracklist' },
      'EventTarget': { spec: 'dom', fragment: 'eventtarget' },
      'DOMString': { spec: 'webidl', fragment: 'idl-DOMString' },
      'boolean': { spec: 'webidl', fragment: 'idl-boolean' },
      'double': { spec: 'webidl', fragment: 'idl-double' },
      'unrestricted double': { spec: 'webidl', fragment: 'idl-unrestricted-double' },
      'unsigned long': { spec: 'webidl', fragment: 'idl-unsigned-long' },
      'unsigned long long': { spec: 'webidl', fragment: 'idl-unsigned-long-long' },
      'void': { spec: 'webidl', fragment: 'idl-void' },
      'ArrayBuffer': { spec: 'typed-array', fragment: 'ArrayBuffer' },
      'ArrayBufferView': { spec: 'typed-array', fragment: 'ArrayBufferView' },
    };
    $("a:not([href])").each(function () {
      var $ant = $(this);
      var className = this.innerHTML;
      var info = externalClassInfo[className];
      if (info) {
	var id = info.fragment;
	var df = doc.createDocumentFragment();
	var baseURL = null;
	if (info.spec == 'html5') {
	  baseURL = HTML_spec_url;
	} else if (info.spec == 'dom') {
	  baseURL = DOM_spec_url;
        } else if (info.spec == 'webidl') {
	  baseURL = "http://dev.w3.org/2006/webapi/WebIDL/";
        } else if (info.spec == 'typed-array') {
	  baseURL = "http://www.khronos.org/registry/typedarray/specs/latest/";
  	} else if (info.spec == 'eme') {
	  baseURL = EME_spec_url;
	}

	if (baseURL) {
	  df.appendChild($("<code/>").wrapInner($("<a/>").attr({href: baseURL + "#" + id, 'class': 'idlType'}).text(className))[0]);
	  this.parentNode.replaceChild(df, this);
	}
      }
    });

    // Move algorithm text after method parameter & return value information.
    $("ol.method-algorithm").each(function() {
      var parent = this.parentNode;
      parent.removeChild(this);
      parent.appendChild($("<p/>").text("When this method is invoked, the user agent must run the following steps:")[0]);
      parent.appendChild(this);
    });

    // Validate that all defined def-ids are actually used.
    var excludeList = window.respecConfig.emeUnusedGroupNameExcludeList || [];
    for (var k in definitionInfo) {
      var defGroupName = definitionInfo[k].groupName;
      if (!usedMap[k] && !(excludeList.indexOf(defGroupName) != -1)) {
	console.log("def-id '" + k + "' from groupName '" + defGroupName + "' never used.");
      }
    }

    $("a[href]").each(function () {
      var link = $(this);
      var href = link.attr('href');
      var matched = /^#(.+)$/.exec(href);
      if (matched) {
	var id = matched[1];
	if (!document.getElementById(id)) {
	  console.log("Internal link to an id '" + id + "' which does not exist");
	}
      }
    });

    return;
  }

  encryptedMediaAddDefinitionInfo("encrypted-media", EME_spec_url, emeDefinitions);

  window.encryptedMediaAddDefinitionInfo = encryptedMediaAddDefinitionInfo;
  window.encryptedMediaPreProcessor = encryptedMediaPreProcessor;
  window.encryptedMediaPostProcessor = encryptedMediaPostProcessor;
})();