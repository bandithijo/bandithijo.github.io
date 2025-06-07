# Jekyll - Easy Youtube Embed
# Katie Harron - https://github.com/pibby
#
#   Input:
#     {% youtube Al9FOtZcadQ %}
#
#   Output:
#   <div class="video">
#     <figure>
#       <iframe width="640" height="480" src="//www.youtube.com/embed/Al9FOtZcadQ" allowfullscreen></iframe>
#     </figure>
#   </div>

module Jekyll

  class Youtube < Liquid::Tag
    @url = nil

    VIDEO_URL = /(\S+)/i

    def initialize(tag_name, markup, tokens)
      super

      if markup =~ VIDEO_URL
        @url = $1
      end
    end

    def render(_context)
      source = "<div class=\"\">"
      source += "<iframe width=\"640\" height=\"480\" class=\"mx-auto\" src=\"/assets/images/bandithijo_logo.svg\" data-echo=\"//www.youtube.com/embed/#{@url}\" onerror=\"imgError(this);\" frameborder=\"0\" allowfullscreen></iframe>"
      source += "</div>"
      source
    end

  end # Youtube
end # Jekyll

Liquid::Template.register_tag('youtube', Jekyll::Youtube)
