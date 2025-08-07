using System;

// =============================================================================
// OBJECT-ORIENTED & IMPERATIVE
// OBJECT-ORIENTED: State is separated in units
// IMPERATIVE: Mutate state
// =============================================================================

public class Calculator
{
    private int sum = 0;
    private int evenCount = 0;

    public void ProcessNumbers(int[] numbers)
    {
        // Methods modify object state imperatively
        foreach (int number in numbers)
        {
            this.sum += number;              // Mutate object state
            if (number % 2 == 0)
            {
                this.evenCount++;            // Mutate object state
            }
        }
    }

    public void DisplayResults()
    {
        Console.WriteLine($"Sum: {sum}, Even count: {evenCount}");
    }
}

class Program
{
    static void Main()
    {
        var calculator = new Calculator();
        int[] numbers = { 1, 2, 3, 4, 5 };
        
        calculator.ProcessNumbers(numbers);
        calculator.DisplayResults();
    }
}
