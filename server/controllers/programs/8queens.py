# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import random
import sys

def attacking(queen1_col, queen1_row, queen2_col, queen2_row):
    if(queen1_row == queen2_row or queen1_row + (queen2_col-queen1_col) == queen2_row or queen1_row - (queen2_col-queen1_col) == queen2_row or queen1_col == queen2_col):
        return True
    return False

def transition_model_simple(state,action):
    if state[action[0]] == None:
        state[action[0]] = action[1]
    return state


class queens_problem:
    
    #Initial state and transition model
    def __init__(self, initial_state, transition_model):
        self.initial_state = initial_state
        self.transition_model = transition_model
     
    #Goal test
    def goal_test(state):
        for queen1_col in range(7):
            for queen2_col in range(x+1,8):
                if attacking(queen1_col, state[queen1_col], queen2_col, state[queen2_col]):
                    return False
        return True
    
    #Heuristics
    def fitness(individual):
        fitness_value = 28
        for x in range(7):
            for y in range(x+1,8):
                if attacking(x,individual[x],y,individual[y]):
                    fitness_value -= 1
        return fitness_value
    
    
    def print_board(state):
        for i in reversed(range(1,9)):
            row_string = ""
            for j in range(0,8):
                if state[j] == i:
                    row_string += "Q "
                else:
                    row_string += "x "
            print(row_string)
    
    def print_heuristic(state):
        for i in reversed(range(1,9)):
            row_string = ""
            for j in range(0,8):
                if state[j] == i:
                    attacks = 0
                    for k in range(0,8):
                        if(k != j):
                            if attacking(i,j,state[k],k):
                                attacks += 1
                    row_string += str(attacks) + " "
                else:
                    row_string += "x "
            print(row_string)
    
    #Actions
    def action(queen_col, queen_row):
        return{queen_col:queen_row}
    
    def new_generation(population):
        new_population = []
        probabilities = []
        for individual in population:
            fitness_of_individual = queens_problem.fitness(individual)
            probabilities.append(fitness_of_individual)
        for i in range(len(population)):
            choices = random.choices(range(len(population)),weights=probabilities,k=2)
            x = population[choices[0]]
            y = population[choices[1]]
            child = reproduce(x,y)
            if(random.randint(1,100) == 1):
                mutate(child)
            new_population.append(child)
        return new_population
    
    def solve(self):
         return self.transition_model(self.initial_state)

def fittest_individual(population):
    fittest = (population[0],queens_problem.fitness(population[0]))
    for individual in population:
        current_fitness = queens_problem.fitness(individual)
        if(current_fitness > fittest[1]):
            fittest = (individual,current_fitness)
    return fittest;

def reproduce(x,y):
    c = random.randint(1, 7)
    return x[0:c] + y[c:8]

def mutate(individual):
    individual[random.randint(0,7)] = random.randint(1,8)
            
def genetic_algorithm(population):
    iteration = 1
    while fittest_individual(population)[1] != 28 and iteration < 101:
        population = queens_problem.new_generation(population)
        
        fittest = fittest_individual(population)
        print(str(iteration) + ". Generation: " + str(fittest_individual(population)))
        queens_problem.print_board(fittest[0])
        print("Number of attacking queens for every queen")
        queens_problem.print_heuristic(fittest[0])
        iteration += 1
    return(fittest_individual(population))

def create_population(size):
    population = []
    for i in range(size):
        new_individual = []
        for j in range(8):
            new_individual.append(random.randint(1, 8))
        population.append(new_individual)
    return population

class csp:
    def __init__(self, x, d, c):
        self.x = x
        self.d = d
        self.c = c
    
def check_assignment_complete(assignment,csp):
    if(len(assignment) != len(csp.x)):
        return False
    return True

def inference(csp, assignment, removals):
    for var1, value in assignment.items():
        for var2, domain in csp.d.items():
            if var2 not in assignment:
                for potential_value in csp.x:
                    if(potential_value not in domain):
                        continue
                    if(value == potential_value or value + (var2-var1) == potential_value or value - (var2-var1) == potential_value):
                        removals.setdefault(var2, []).append(potential_value)
                        domain.remove(potential_value)
                    if len(domain) == 0:
                        return False
    return True
    
def consistent(var, value, assignment, csp):
    for assigned_var, assigned_value in assignment.items():
        if(value == assigned_value or value + (var-assigned_var) == assigned_value or value - (var-assigned_var) == assigned_value):
            return False
    return True

def select_unassigned_var(assignment,csp):
    for var in csp.x:
        if var not in assignment:
            return var
    return "should not get here"

def add_inferences_to_assignment(inferences,assignment):
    for result in inferences:
        assignment.insert(result[0],result[1])
        

def backtrack(assignment, csp, results):
    if check_assignment_complete(assignment, csp):
        results.append(dict(assignment))
        return
    var = select_unassigned_var(assignment, csp)
    for value in csp.d[var]:
        if consistent(var, value, assignment, csp):
            assignment[var] = value
            removals = {}
            inferences = inference(csp, assignment, removals)
            if inferences != False:
                backtrack(assignment, csp, results)
            for variable, domain in removals.items():
                for removed_value in domain:
                    csp.d[variable].append(removed_value)
            del assignment[var]

    return False

def backtracking_search(csp):
    results = []
    backtrack({},csp,results)
    solution_number = 1
    for result in results:
        print("Solution " + str(solution_number))
        solution_number += 1
        queens_problem.print_board(list(result.values()))
        #print(result)
    #print("Number of Solutions found: " + str(len(results)))


if sys.argv[1] == 'true':
    ga_queens = queens_problem(create_population(1000), genetic_algorithm)
    ga_queens.solve()
else:
    x = [1,2,3,4,5,6,7,8]
    domains = {}
    for var in x:
        domains[var] = [1,2,3,4,5,6,7,8]
    queens = csp(x,domains,consistent)
    backtrack_queens = queens_problem(queens,backtracking_search)
    backtrack_queens.solve()
    print ('argument list', sys.argv)
#print(backtracking_search(queens))