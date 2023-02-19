---
title: Dozenten
eleventyNavigation:
  key: Dozenten
  order: 30
templateEngineOverride: njk,md
override:tags: []
---

<div class="d-flex">
<div class="d-flex-main">


# {{ title }}

{%- for person in collections.dozent | sort(false, false, 'data.order') %}

  <section id="heading-{{ person.fileSlug }}">
    <h2>
      {{ person.data.title }}
    </h2>

    {{ person.data.title }}
    <em>{{ person.data.area }}</em>
    {% getDozentImg person.fileSlug, person.data.title %}
    <p>{{ person.data.born }}</p>
    {{ person.templateContent | safe }}
  </section>
{%- endfor -%}


</div>
<div class="d-flex-sidebar">

  {% set tocTruncateTitle = true %}
  {% set tocCollection = collections.dozent %}
  {% include 'partials/toc.njk' %}

</div>
</div>