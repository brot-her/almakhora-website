#!/bin/bash
# postbuild.sh - копирует SEO файлы после билда
echo "Adding SEO files to public folder..."

# Копируем SEO файлы в public
if [ -f "robots.txt" ]; then
  cp robots.txt public/
  echo "✓ robots.txt copied"
fi

if [ -f "sitemap.xml" ]; then
  cp sitemap.xml public/
  echo "✓ sitemap.xml copied"
fi

# Копируем файлы верификации Яндекса
for file in yandex_verification_*.html; do
  if [ -f "$file" ]; then
    cp "$file" public/
    echo "✓ $file copied"
  fi
done

echo "SEO files added successfully!"
