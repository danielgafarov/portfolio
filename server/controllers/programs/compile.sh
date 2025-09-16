for dir in */; do
    cd $dir
    git pull
    g++ -g *.cpp -o ${dir%?}
    cd ..
done