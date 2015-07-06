
module RemoveAccent
  def remove_accent(data)
    accent = {
      "a" => /[àáạảãâầấậẩẫăằắặẳẵ]/,
      "e" => /[èéẹẻẽêềếệểễ]/,
      "i" => /[ìíịỉĩ]/,
      "o" => /[òóọỏõôồốộổỗơờớợởỡ]/,
      "u" => /[ùúụủũưừứựửữ]/,
      "y" => /[ỳýỵỷỹ]/,
      "d" => /[đ]/,
    }
    accent.each do |char, regex|
      data.gsub!(regex,char)
    end
    return data
  end
end