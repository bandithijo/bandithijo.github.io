module Jekyll
  class Youtube < Liquid::Tag
    VIDEO_URL = /(\S+)/i

    def initialize(tag_name, markup, tokens)
      super
      @url = markup.strip.match(VIDEO_URL)[1]
    end

    def render(_context)
      <<~HTML
        <div class="relative w-full pb-[56.25%] h-0 overflow-hidden max-w-full">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="/assets/images/bandithijo_logo.svg"
            data-echo="https://www.youtube.com/embed/#{@url}"
            frameborder="0"
            allowfullscreen
            onerror="imgError(this);"
          ></iframe>
        </div>
      HTML
    end
  end
end

Liquid::Template.register_tag('youtube', Jekyll::Youtube)
