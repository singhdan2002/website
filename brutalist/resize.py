"""
this script was created because the images from midjourney were 1024 by 1024, which is too large for this site.
So this script reduces any .png image by 4 times given it's height and width is over 1000px.

Author: Danishjeet Singh
"""

import os
from PIL import Image

# Set the directory path
dir_path = "images/"

# Loop through all files in the directory
for filename in os.listdir(dir_path):
    # Check if the file is an image file
    if filename.endswith(".png"):
        # Open the image file
        filepath = os.path.join(dir_path, filename)
        image = Image.open(filepath)

        # Get the size of the image
        width, height = image.size

        # Divide the size by 2 to reduce the height and width by half
        if width > 1000 and height > 1000:
          new_width = width // 2
          new_height = height // 2

          # Resize the image to the new dimensions
          resized_image = image.resize((new_width, new_height))

          # Save the resized image by replacing the original file
          resized_filename = os.path.splitext(filename)[0] + os.path.splitext(filename)[1]
          resized_filepath = os.path.join(dir_path, resized_filename)
          resized_image.save(resized_filepath)

        # Close the image file
        image.close()

