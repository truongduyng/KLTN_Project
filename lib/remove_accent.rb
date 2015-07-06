
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
    result = data
    accent.each do |char, regex|
      result = result.gsub(regex,char)
    end
    return result
  end
end