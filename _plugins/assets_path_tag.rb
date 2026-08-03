module Jekyll
  class AssetsPathTag < Liquid::Tag
    include Jekyll::Filters::URLFilters

    def render(context)
      @context = context
      page = context.registers[:page]

      relative_path =
        if page["collection"] == "blogs"
          basename = File.basename(page["name"].to_s, ".*")
          "/assets/posts/#{page["category"]}/#{basename[0, 4]}/#{basename}"
        elsif page["collection"] == "notes"
          basename = File.basename(page["name"].to_s, ".*")
          "/assets/posts/#{page["category"]}/#{basename}"
        else
          slug = File.basename(page["name"].to_s, ".*")
          "/assets/pages/#{slug}"
        end

      absolute_url(relative_path)
    end
  end
end

Liquid::Template.register_tag('assets_path', Jekyll::AssetsPathTag)
