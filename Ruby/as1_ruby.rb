#start of Program
def startProgram()
  puts "enter the size of the grid"
  $size = gets.chomp.to_i
  $array = Array.new($size){Array.new($size, 0)}
  for i in 0...$size do
    $array[i][i] = rand(1..9)*10
  end
  # zHash to find the index
  $column_hash = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9
  }
  $expression_hash = Hash.new
  $dependent_hash = Hash.new
end
# Function to print the array
def print_array
  $array.each do |r|
    print "|"
    r.each do |c|
      print "#{c}\t |"
    end
    print "\n"
  end
end

def set_dependency (lhs, rhs)
  cells = rhs.split(" ")
  #temp variable to push the dependent cell into the Hash
  temp = $dependent_hash[cells[0].to_sym] || []
  temp.push(lhs)
  $dependent_hash[cells[0].to_sym] = temp
  temp = $dependent_hash[cells[2].to_sym] || []
  temp.push(lhs)
  $dependent_hash[cells[2].to_sym] = temp
end

def execute_string(lhs,rhs)
  cells = rhs.split(" ")
  $array[lhs[1].to_i][$column_hash[lhs[0].to_sym]] = $array[cells[0][1].to_i][$column_hash[cells[0][0].to_sym]].send(cells[1], $array[cells[2][1].to_i][$column_hash[cells[2][0].to_sym]])
end

def resolve_dependency(input)
  puts $dependent_hash[input]
  unless ($dependent_hash[input] == [] || !$dependent_hash[input])
      $dependent_hash[input].each do |key|
        execute_string(key, $expression_hash[key.to_sym])
        resolve_dependency(key.to_sym)
    end
  end
end

def assign_value
  puts "enter the assignment like a1 = 5"
  inp_str = gets.chomp.to_s.upcase
  if (inp_str[0].ord >= 'A'.ord && inp_str[0].ord <= 'Z'.ord)
    inp_str.tr!(' ','')
    puts inp_str
    inp = inp_str.split("=")
    puts inp
    column = $column_hash[inp[0][0].to_sym]
    row = inp[0][1].to_i
    value = inp[1].to_i
    $array[row][column] = value
    resolve_dependency(inp[0].to_sym)
    print_array
  else
    puts 'invalid Input Try again'
    assign_value
  end
end

def assign_relation
  puts "enter the expression in the form of a1 = a0 + a2"
  inp_str = gets.chomp.to_s.upcase
  if (inp_str.split(" ").length != 5)
    return false;
  end
  inp = inp_str.split(" = ")
  lhs = inp[0]
  rhs = inp[1]
  #saving the input expression into expression_hash
  $expression_hash[lhs.to_sym] = rhs
  set_dependency(lhs, rhs)
  execute_string(lhs, rhs)
  resolve_dependency(lhs.to_sym)
  print_array
  return true;
end

def interface
  loop do
    puts "\nenter\n 1 \tto assign value \n 2\t for expression\n 3\t to print\n 4\t for exit"
    choice = gets.chomp.to_i
    case choice
    when 1 #to assign a value to the cell
      assign_value
    when 2 #to define an expression
      loop do
        flag = assign_relation
        unless (flag)
          puts "\nInvalid expression format,please enter the expression in the given format only"
        else
          break
        end
      end
    when 3
      print_array
    when 4
      break
    else
      puts "invalid input, Try again"
    end
  end
end

startProgram
#interface to choose option
interface
