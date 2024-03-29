# For C Projects
CC = gcc
CFLAGS = -std=c++17 -pedantic -Wall -g
OBJECTS = cracker.o
LIBS = -lstdc++
PHONY_TARGETS = all:test:clean:help

.PHONY: $(subst :, ,$(PHONY_TARGETS))

# This is the default target
all: <ALL DELIVERABLES HERE>

# For C Projects
%.o: %.cc
	$(CC) $(CFLAGS) -c $<

<BINARY_NAME_HERE>: $(OBJECTS)
	$(CC) $(OBJECTS) $(LIBS) -o $@

clean: <OTHER_CLEAN TARGETS>
	rm -f *.o <BINARY_NAME_HERE> <ETC>

clean-doc:
	rm -rf README.md doc/xml
	
help:
	@echo $(subst :," | ",$(PHONY_TARGETS))