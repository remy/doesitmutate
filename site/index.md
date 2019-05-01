---
layout: layout.njk
permalink: /index.html
---

{%for method in methods %}
  {%include method.njk %}
{% endfor %}
