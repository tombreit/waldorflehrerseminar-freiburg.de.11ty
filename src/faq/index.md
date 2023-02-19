---
title: FAQ
override:tags: []
templateEngineOverride: njk,md
eleventyNavigation:
  key: FAQ
  order: 40
---


<div class="d-flex">
<div class="d-flex-main">

# {{ title }}

Das Berufsbegleitende Waldorflehrerseminar Freiburg ist Mitglied in der Konferenz der Berufsbegleitenden Waldorflehrerausbildungen in Deutschland. 

{%- for faq in collections.faqEntry | sort(false, false, 'data.order') %}
<section id="heading-{{ faq.fileSlug }}">
  <h2>
    {{ faq.data.title }}
  </h2>
  {{ faq.templateContent | safe }}
</section>
{%- endfor -%}

</div>
<div class="d-flex-sidebar">

  {% set tocCollection = collections.faqEntry %}
  {% include 'partials/toc.njk' %}

</div>
</div>
