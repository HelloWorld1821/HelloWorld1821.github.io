{% macro render(display_toc) %}
  <div class="toggle sidebar-toggle">
    <span class="toggle-line toggle-line-first"></span>
    <span class="toggle-line toggle-line-middle"></span>
    <span class="toggle-line toggle-line-last"></span>
  </div>

  <aside class="sidebar">
    <div class="sidebar-inner">

      {%- set display_toc = page.toc.enable and display_toc %}
      {%- if display_toc %}
        {%- set toc = toc(page.content, { class: "nav", list_number: page.toc.number, max_depth: page.toc.max_depth }) %}
        {%- set display_toc = toc.length > 1 and display_toc %}
      {%- endif %}

      <ul class="sidebar-nav motion-element">
        <li class="sidebar-nav-toc">
          {{ __('sidebar.toc') }}
        </li>
        <li class="sidebar-nav-overview">
          {{ __('sidebar.overview') }}
        </li>
      </ul>

      <!--noindex-->
      <div class="post-toc-wrap sidebar-panel">
        {%- if display_toc %}
          <div class="post-toc motion-element">{{ toc }}</div>
        {%- endif %}
      </div>
      <!--/noindex-->

      <div class="site-overview-wrap sidebar-panel">
        {{ partial('_partials/sidebar/site-overview.swig', {}, {cache: theme.cache.enable}) }}

        {{- next_inject('sidebar') }}
      </div>

      {%- if theme.back2top.enable and theme.back2top.sidebar %}
        <div class="back-to-top motion-element">
          <i class="fa fa-arrow-up"></i>
          <span>0%</span>
        </div>
      {%- endif %}

      {% if site.tags.length > 1 %}
        {%- set sidebar_tagcloud_words = site.tags.sort('length', -1).limit(theme.tagcloud.amount).toArray() %}
        <div class="widget-wrap sidebar-tag-cloud">
          <h3 class="widget-title">Tag Cloud</h3>
          <div class="widget tagcloud sidebar-tag-cloud-tags" aria-hidden="true">
            {%- for tag in sidebar_tagcloud_words %}
              <span class="sidebar-tag-cloud-word sidebar-tag-cloud-word-major sidebar-tag-cloud-link-{{ loop.index0 }}">{{ tag.name }}</span>
            {%- endfor %}
            {%- for sidebar_tagcloud_round in [1, 2, 3] %}
              {%- for tag in sidebar_tagcloud_words %}
                <span class="sidebar-tag-cloud-word sidebar-tag-cloud-word-fill sidebar-tag-cloud-link-{{ loop.index0 }}">{{ tag.name }}</span>
              {%- endfor %}
            {%- endfor %}
          </div>
        </div>
      {% endif %}


    </div>
  </aside>
  <div id="sidebar-dimmer"></div>
{% endmacro %}
