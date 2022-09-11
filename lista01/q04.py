def to_decimal(number, base):
    reversed = str(number)[::-1]
    result = 0

    for idx, digit in enumerate(reversed):
        digit = int(digit)
        if digit >= base:
            raise Exception("Invalid number")
        result += digit * pow(base, idx)

    return result


if __name__ == "__main__":
    base, number = input("Enter the base and number (separated by space): ").split(" ")

    base = int(base)
    number = int(number)

    if base <= 1:
        raise Exception("Base must be greater than one")

    if number < 0:
        raise Exception("Number must be greated than zero")

    print(to_decimal(number, base))
