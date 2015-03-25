# coding: utf-8

# Require any additional compass plugins here.

#environment = :production
#environment = :development

# Set this to the root of your project when deployed:
sass_dir = "."
css_dir = "../../htdocs"
fonts_dir = "../../htdocs/common/fonts"
images_dir = "../images"
generated_images_dir = "../../htdocs/common/responsive/images"

# You can select your preferred output style here (can be overridden via the command line):
output_style = (environment == :production) ? :compressed : :expanded
#output_style = :expand

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = (environment == :production) ? :false : :true

sass_options = {:unix_newlines => true}


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# Make a copy of sprites with a name that has no uniqueness of the hash.
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    css = '@charset "UTF-8";' + css
    css = css.sub(/^@charset "UTF-8";@charset "UTF-8";/, '@charset "UTF-8";')
    css = css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    File.open(filename, 'wb+') do |f|
      f << css
    end
  end
end
