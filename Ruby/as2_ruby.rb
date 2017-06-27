class EmptyStringError < NoIntegerError
  attr_reader :msg
  def initialize()
      @msg="The given string is empty"
  end
end
class NoIntegerError < NoPositiveIntegerError
  attr_reader :msg
  def initialize()
      @msg="The given string has no integers"
  end
end
class NoPositiveIntegerError < StandardError
  attr_reader :msg
  def initialize()
      @msg="The given string contains no positive integers"
  end
end
def calculate_avg
  puts "input string"
  inp = gets.chomp
  puts ""
  size = inp.size
  #check for empty string
  begin
    raise EmptyStringError if size == 0
    rescue EmptyStringError => e
    puts e.class
    puts e.msg# "my thing"
    return
  end
  #loop to replace all the non integers in the string with " "
  for i in 0...size do
    if !(inp[i].ord>=48 && inp[i].ord <=57)&&(inp[i] != "-")
      inp[i] = " "
    end
  end
  #extracting integers from the string
  values = inp.split(" ")
  #check for integers
    begin
      raise NoIntegerError if values.count==0
      rescue NoIntegerError => e
      puts e.class
      puts e.msg# "my thing"
      return
    end
  sum = 0
  count = 0
  values.each do |i|
    if (i.to_i>0)
      sum += i.to_i
      count +=1
    end
  end
  #check for positive integers
  begin
    raise NoPositiveIntegerError if count==0
    rescue NoPositiveIntegerError => e
    puts e.class
    puts e.msg# "my thing"
    return
  end
  puts "number of positive integers in the given string are #{count}"
  puts "The average of those positive integers  is #{sum.to_f/count}"
end
#Function call
calculate_avg
